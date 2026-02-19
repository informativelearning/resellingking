import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { INVENTORY } from '../constants';

const ADMIN_PASSWORD = 'wof661';
const STORAGE_KEY = 'wof_custom_inventory';

export interface CustomProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  spec: string;
  category: Category;
  condition: string;
  description: string;
  images: string[]; // comma-separated image paths entered by admin
  active: boolean;
}

// Load custom products from localStorage
export const loadCustomProducts = (): CustomProduct[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

// Merge base inventory with custom products
export const getMergedInventory = (): Product[] => {
  const custom = loadCustomProducts().filter(p => p.active);
  const customAsProducts: Product[] = custom.map(p => ({
    ids: [p.id],
    brand: p.brand,
    name: p.name,
    price: p.price,
    spec: p.spec,
    category: p.category,
    condition: p.condition,
    stock: 10,
    image: p.images[0] || '/images/placeholder.jpg',
    images: p.images,
    details: { description: p.description },
  }));
  return [...INVENTORY, ...customAsProducts];
};

const EMPTY_PRODUCT: Omit<CustomProduct, 'id'> = {
  brand: '',
  name: '',
  price: 80,
  spec: '100ml',
  category: 'Fragrance',
  condition: 'Sealed',
  description: 'Verified authentic. 2024/2025 batch.',
  images: [],
  active: true,
};

const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [products, setProducts] = useState<CustomProduct[]>([]);
  const [editing, setEditing] = useState<CustomProduct | null>(null);
  const [form, setForm] = useState<Omit<CustomProduct, 'id'>>(EMPTY_PRODUCT);
  const [imageInput, setImageInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProducts(loadCustomProducts());
  }, []);

  const persist = (updated: CustomProduct[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProducts(updated);
  };

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 1500);
    }
  };

  const handleSave = () => {
    const images = imageInput
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    if (!form.brand || !form.name) return;

    if (editing) {
      const updated = products.map(p =>
        p.id === editing.id ? { ...form, images, id: editing.id } : p
      );
      persist(updated);
    } else {
      const newProduct: CustomProduct = {
        ...form,
        images,
        id: `custom|${form.brand}|${form.name}`.toLowerCase().replace(/\s+/g, '-'),
      };
      persist([...products, newProduct]);
    }
    setEditing(null);
    setForm(EMPTY_PRODUCT);
    setImageInput('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleEdit = (p: CustomProduct) => {
    setEditing(p);
    setForm({ ...p });
    setImageInput(p.images.join('\n'));
  };

  const handleToggle = (id: string) => {
    persist(products.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleDelete = (id: string) => {
    persist(products.filter(p => p.id !== id));
  };

  const handleNew = () => {
    setEditing(null);
    setForm(EMPTY_PRODUCT);
    setImageInput('');
  };

  if (!authed) {
    return (
      <div className="fixed inset-0 z-[200] bg-v-black flex items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <p className="text-v-red text-[10px] tracking-[0.5em] uppercase font-mono mb-2">Wings of Fortune</p>
            <h2 className="serif italic text-4xl text-white">Admin</h2>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="password"
              className={`w-full bg-transparent border-b py-3 text-white text-sm font-mono focus:outline-none placeholder-white/20 transition-colors ${pwError ? 'border-v-red' : 'border-white/20 focus:border-white/50'}`}
            />
            {pwError && <p className="text-[10px] text-v-red font-mono">wrong password.</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-v-red text-white py-4 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-v-black transition-all duration-300"
            >
              Enter
            </button>
            <button
              onClick={onClose}
              className="w-full text-white/20 text-xs uppercase tracking-[0.3em] py-2 hover:text-white/50 transition-colors font-mono"
            >
              ← back to site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-v-black overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-v-red text-[9px] tracking-[0.5em] uppercase font-mono">Wings of Fortune</p>
            <h2 className="serif italic text-3xl text-white mt-1">inventory manager</h2>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white text-xs tracking-[0.3em] uppercase font-mono transition-colors">
            ← site
          </button>
        </div>

        {/* Note about base inventory */}
        <div className="bg-white/[0.03] border border-white/8 px-4 py-3">
          <p className="text-[10px] text-white/35 font-mono leading-relaxed">
            base inventory ({INVENTORY.length} items) is managed in <span className="text-white/60">constants.ts</span>. use this panel to add extra products on the fly — they save to your browser and show up live on the site.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-mono">
              {editing ? 'editing product' : 'add new product'}
            </h3>
            {editing && (
              <button onClick={handleNew} className="text-[9px] text-white/25 hover:text-white/50 uppercase tracking-wider font-mono transition-colors">
                + new instead
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] text-white/30 uppercase tracking-widest font-mono">brand</label>
              <input
                value={form.brand}
                onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                className="w-full bg-transparent border-b border-white/15 py-2 text-white text-sm focus:outline-none focus:border-white/40 font-mono transition-colors"
                placeholder="e.g. Dior"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-white/30 uppercase tracking-widest font-mono">name</label>
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-transparent border-b border-white/15 py-2 text-white text-sm focus:outline-none focus:border-white/40 font-mono transition-colors"
                placeholder="e.g. Sauvage EDP"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-white/30 uppercase tracking-widest font-mono">price ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                className="w-full bg-transparent border-b border-white/15 py-2 text-white text-sm focus:outline-none focus:border-white/40 font-mono transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-white/30 uppercase tracking-widest font-mono">spec</label>
              <input
                value={form.spec}
                onChange={e => setForm(f => ({ ...f, spec: e.target.value }))}
                className="w-full bg-transparent border-b border-white/15 py-2 text-white text-sm focus:outline-none focus:border-white/40 font-mono transition-colors"
                placeholder="100ml / S, M, L"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-white/30 uppercase tracking-widest font-mono">category</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as Category, condition: e.target.value === 'Apparel' ? 'New with Tags' : 'Sealed' }))}
                className="w-full bg-v-black border-b border-white/15 py-2 text-white text-sm focus:outline-none focus:border-white/40 font-mono transition-colors"
              >
                <option value="Fragrance">Fragrance</option>
                <option value="Apparel">Apparel</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-white/30 uppercase tracking-widest font-mono">condition</label>
              <input
                value={form.condition}
                onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}
                className="w-full bg-transparent border-b border-white/15 py-2 text-white text-sm focus:outline-none focus:border-white/40 font-mono transition-colors"
                placeholder="Sealed / New with Tags"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-white/30 uppercase tracking-widest font-mono">description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full bg-transparent border border-white/10 p-3 text-white text-sm focus:outline-none focus:border-white/30 font-mono transition-colors resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-white/30 uppercase tracking-widest font-mono">image paths — one per line</label>
            <textarea
              value={imageInput}
              onChange={e => setImageInput(e.target.value)}
              rows={3}
              className="w-full bg-transparent border border-white/10 p-3 text-white/70 text-xs focus:outline-none focus:border-white/30 font-mono transition-colors resize-none"
              placeholder={`/images/My Product.jpg\n/images/My Product1.jpg`}
            />
            <p className="text-[9px] text-white/20 font-mono">paths relative to /public — same format as existing images</p>
          </div>

          <button
            onClick={handleSave}
            disabled={!form.brand || !form.name}
            className="w-full bg-v-red text-white py-4 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-v-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {saved ? '✓ saved' : editing ? 'update product' : 'add to inventory'}
          </button>
        </div>

        {/* Custom products list */}
        {products.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">custom products ({products.length})</h3>
            <div className="divide-y divide-white/5 border border-white/8">
              {products.map(p => (
                <div key={p.id} className="flex items-center gap-4 px-4 py-3">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.active ? 'bg-v-red' : 'bg-white/15'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-v-red uppercase tracking-wider font-bold">{p.brand}</p>
                    <p className="text-sm text-white serif italic truncate">{p.name}</p>
                    <p className="text-[9px] text-white/25 font-mono">${p.price} · {p.category}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button onClick={() => handleToggle(p.id)} className="text-[9px] text-white/25 hover:text-white uppercase tracking-wider font-mono transition-colors">
                      {p.active ? 'hide' : 'show'}
                    </button>
                    <button onClick={() => handleEdit(p)} className="text-[9px] text-white/25 hover:text-white uppercase tracking-wider font-mono transition-colors">
                      edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-[9px] text-white/20 hover:text-v-red uppercase tracking-wider font-mono transition-colors">
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-[9px] text-white/10 font-mono text-center pb-4">
          data saved to browser storage — stays between sessions.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;