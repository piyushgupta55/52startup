"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Circle,
  Rocket,
  X,
  Save
} from "lucide-react";
import { startups as initialStartups, Startup, StartupStatus } from "@/data/startups";
import { motion, AnimatePresence } from "framer-motion";

const statusIcons = {
  completed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
  "in-progress": { icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
  upcoming: { icon: Circle, color: "text-slate-400", bg: "bg-slate-50" },
};

export default function ManageStartups() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingStartup, setEditingStartup] = useState<Startup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("52startup_data");
    if (saved) {
      setStartups(JSON.parse(saved));
    } else {
      setStartups(initialStartups);
    }
  }, []);

  // Save to localStorage whenever data changes
  const saveData = (newData: Startup[]) => {
    setStartups(newData);
    localStorage.setItem("52startup_data", JSON.stringify(newData));
  };

  const filteredStartups = startups.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (week: number) => {
    if (confirm(`Are you sure you want to delete Week ${week}?`)) {
      const newData = startups.filter(s => s.week !== week);
      saveData(newData);
    }
  };

  const handleEdit = (startup: Startup) => {
    setEditingStartup({ ...startup });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStartup) return;

    const exists = startups.find(s => s.week === editingStartup.week);
    let newData: Startup[];
    
    if (exists) {
      newData = startups.map(s => s.week === editingStartup.week ? editingStartup : s);
    } else {
      newData = [...startups, editingStartup].sort((a, b) => a.week - b.week);
    }

    saveData(newData);
    setIsModalOpen(false);
    setEditingStartup(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Startups</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time control over your startup roadmap.</p>
        </div>
        <button 
          onClick={() => {
            setEditingStartup({
              week: startups.length + 1,
              name: "",
              tagline: "",
              url: "",
              thumbnail: "",
              category: "",
              status: "upcoming",
              launchDate: new Date().toISOString().split('T')[0],
              tags: []
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
        >
          <Plus size={20} />
          <span>Add New Week</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search startups..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "completed", "in-progress", "upcoming"].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap capitalize ${filter === f ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Week</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Startup</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence mode="popLayout">
                {filteredStartups.map((startup) => {
                  const StatusIcon = statusIcons[startup.status].icon;
                  return (
                    <motion.tr 
                      key={startup.week}
                      layout
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-400">#{startup.week}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                            {startup.thumbnail ? (
                              <img src={startup.thumbnail} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Rocket size={16} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{startup.name || "Untitled"}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{startup.category || "No Category"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusIcons[startup.status].bg} ${statusIcons[startup.status].color}`}>
                          <StatusIcon size={12} />
                          {startup.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(startup)}
                            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(startup.week)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">
                {startups.find(s => s.week === editingStartup.week) ? "Edit Week" : "Add New Week"} {editingStartup.week}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Startup Name</label>
                  <input 
                    type="text" 
                    value={editingStartup.name}
                    onChange={e => setEditingStartup({...editingStartup, name: e.target.value})}
                    placeholder="Alpha Analytics"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <input 
                    type="text" 
                    value={editingStartup.category}
                    onChange={e => setEditingStartup({...editingStartup, category: e.target.value})}
                    placeholder="SaaS / AI"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tagline</label>
                <input 
                  type="text" 
                  value={editingStartup.tagline}
                  onChange={e => setEditingStartup({...editingStartup, tagline: e.target.value})}
                  placeholder="Short description of the startup..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                  <select 
                    value={editingStartup.status}
                    onChange={e => setEditingStartup({...editingStartup, status: e.target.value as StartupStatus})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Launch Date</label>
                  <input 
                    type="date" 
                    value={editingStartup.launchDate}
                    onChange={e => setEditingStartup({...editingStartup, launchDate: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Website URL</label>
                  <input 
                    type="url" 
                    value={editingStartup.url}
                    onChange={e => setEditingStartup({...editingStartup, url: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Thumbnail Image</label>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                      <input 
                        type="url" 
                        value={editingStartup.thumbnail}
                        onChange={e => setEditingStartup({...editingStartup, thumbnail: e.target.value})}
                        placeholder="Paste image URL..."
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500"
                      />
                      {editingStartup.thumbnail && (
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                          <img src={editingStartup.thumbnail} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditingStartup({...editingStartup, thumbnail: reader.result as string});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden" 
                        id="thumbnail-upload"
                      />
                      <label 
                        htmlFor="thumbnail-upload"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer transition-all border border-dashed border-slate-300"
                      >
                        <Plus size={16} />
                        <span>Upload from Computer</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-950/20 flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
