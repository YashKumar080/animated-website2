"use client";

import React, { useState, useEffect } from "react";
import { Plus, Check, X, Clock, Trash2, Calendar, Clipboard, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Medicine {
  id: string;
  name: string;
  time: string;
  dosage: string;
  notes: string;
  status: 'pending' | 'taken' | 'missed';
  createdAt: number;
}

export default function MedicineManager() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', time: '', dosage: '', notes: '' });

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('medicines');
    if (saved) {
      setMedicines(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);

  const addMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.name || !newMed.time) return;

    const med: Medicine = {
      id: Math.random().toString(36).substr(2, 9),
      ...newMed,
      status: 'pending',
      createdAt: Date.now(),
    };

    setMedicines([med, ...medicines]);
    setNewMed({ name: '', time: '', dosage: '', notes: '' });
    setShowAddModal(false);
  };

  const updateStatus = (id: string, status: 'taken' | 'missed' | 'pending') => {
    setMedicines(medicines.map(m => m.id === id ? { ...m, status } : m));
  };

  const deleteMed = (id: string) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const sortedMeds = [...medicines].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <section id="manager" className="min-h-screen py-24 px-4 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-6 md:space-y-0">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2">My Daily Schedule</h2>
            <p className="text-white/40 max-w-md">Organize your medications and keep track of your health journey every day.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-bold transition-all shadow-[0_15px_30px_rgba(255,255,255,0.1)]"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            Add New Medicine
          </motion.button> 
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <Clock className="text-accent" />
              Upcoming Medications
            </h3>
            
            <AnimatePresence mode="popLayout" initial={false}>
              {sortedMeds.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-12 border-2 border-dashed border-white/10 rounded-3xl text-center bg-white/5"
                >
                  <Calendar className="mx-auto mb-4 text-white/20" size={48} />
                  <p className="text-white/40">No medications scheduled yet. Add your first reminder to get started.</p>
                </motion.div>
              ) : (
                sortedMeds.map((med) => (
                  <motion.div
                    key={med.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    className={cn(
                      "group p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 flex flex-col md:flex-row justify-between items-center gap-6",
                      med.status === 'taken' && "border-green-500/30 bg-green-500/5",
                      med.status === 'missed' && "border-red-500/30 bg-red-500/5"
                    )}
                  >
                    <div className="flex gap-6 items-center w-full">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold",
                        med.status === 'taken' ? "bg-green-500 text-white" : 
                        med.status === 'missed' ? "bg-red-500 text-white" : 
                        "bg-accent text-white"
                      )}>
                        {med.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-1">{med.name}</h4>
                        <div className="flex gap-4 text-sm text-white/40">
                          <span className="flex items-center gap-1"><Clipboard size={14} /> {med.dosage}</span>
                          {med.notes && <span className="italic">"{med.notes}"</span>}
                        </div>
                      </div>
                    </div>

                    <motion.div className="flex gap-3 w-full md:w-auto">
                      {med.status === 'pending' && (
                        <>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateStatus(med.id, 'taken')}
                            className="flex-1 md:flex-none px-6 py-3 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl hover:bg-green-500 hover:text-white transition-all font-semibold"
                          >
                            Mark Taken
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateStatus(med.id, 'missed')}
                            className="flex-1 md:flex-none px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all font-semibold"
                          >
                            Mark Missed
                          </motion.button>
                        </>
                      )}
                      {med.status !== 'pending' && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateStatus(med.id, 'pending')}
                          className="flex-1 md:flex-none px-6 py-3 bg-white/5 text-white/40 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all font-semibold"
                        >
                          Reset
                        </motion.button>
                      )}
                      <motion.button 
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteMed(med.id)}
                        className="p-3 bg-white/5 text-white/20 border border-white/5 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-accent text-white shadow-2xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <History />
                Daily Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/20 p-4 rounded-2xl">
                  <span>Adherence Rate</span>
                  <span className="text-2xl font-black">
                    {medicines.length > 0 
                      ? Math.round((medicines.filter(m => m.status === 'taken').length / medicines.length) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-white/60 text-xs uppercase font-bold tracking-widest mb-1">Taken</p>
                    <p className="text-3xl font-black">{medicines.filter(m => m.status === 'taken').length}</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-white/60 text-xs uppercase font-bold tracking-widest mb-1">Missed</p>
                    <p className="text-3xl font-black">{medicines.filter(m => m.status === 'missed').length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Concept UI */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                  </motion.div>
               </div>
               <h4 className="font-bold mb-4">Remote Syncing</h4>
               <p className="text-sm text-white/40 italic">Syncing to Dr. Harrison's terminal in real-time...</p>
               <div className="mt-6 flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">JD</div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">MS</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-xl bg-[#121212] border border-white/10 p-10 rounded-[3rem] shadow-2xl"
            >
              <h3 className="text-3xl font-bold mb-8">Schedule Medication</h3>
              <form onSubmit={addMedicine} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Name</label>
                  <input 
                    required
                    type="text" 
                    value={newMed.name}
                    onChange={e => setNewMed({...newMed, name: e.target.value})}
                    placeholder="e.g. Vitamin C"
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-accent transition-all text-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Time</label>
                    <input 
                      required
                      type="time" 
                      value={newMed.time}
                      onChange={e => setNewMed({...newMed, time: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Dosage</label>
                    <input 
                      type="text" 
                      value={newMed.dosage}
                      onChange={e => setNewMed({...newMed, dosage: e.target.value})}
                      placeholder="e.g. 500mg"
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">Notes (Optional)</label>
                  <input 
                    type="text" 
                    value={newMed.notes}
                    onChange={e => setNewMed({...newMed, notes: e.target.value})}
                    placeholder="e.g. Take with water"
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:outline-none focus:border-accent transition-all"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-5 border border-white/5 hover:bg-white/5 rounded-2xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-[2] py-5 bg-accent hover:bg-accent/80 text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  >
                    Add Medication
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
