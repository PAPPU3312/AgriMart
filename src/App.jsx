import { useState, useEffect } from "react";

const initialGrocery = [
  { id: 1, name: "Organic Wheat", category: "Grains", price: 45, unit: "kg", stock: 200, rating: 4.5, seller: "Punjab Farms", img: "🌾", desc: "Premium quality organic wheat, freshly harvested." },
  { id: 2, name: "Basmati Rice", category: "Grains", price: 85, unit: "kg", stock: 150, rating: 4.7, seller: "Dehradun Mills", img: "🍚", desc: "Long-grain aromatic basmati rice, aged 2 years." },
  { id: 3, name: "Fresh Tomatoes", category: "Vegetables", price: 30, unit: "kg", stock: 80, rating: 4.3, seller: "Green Valley", img: "🍅", desc: "Farm-fresh red tomatoes, rich in lycopene." },
  { id: 4, name: "Onions", category: "Vegetables", price: 25, unit: "kg", stock: 300, rating: 4.2, seller: "Nashik Farms", img: "🧅", desc: "Big, fresh red onions direct from Nashik." },
  { id: 5, name: "Mustard Oil", category: "Oils", price: 180, unit: "litre", stock: 60, rating: 4.6, seller: "Kachi Ghani", img: "🫙", desc: "Cold-pressed pure mustard oil, traditional taste." },
  { id: 6, name: "Turmeric Powder", category: "Spices", price: 120, unit: "kg", stock: 40, rating: 4.8, seller: "Erode Spices", img: "🌿", desc: "High-curcumin turmeric powder, organically grown." },
  { id: 7, name: "Green Chilli", category: "Vegetables", price: 40, unit: "kg", stock: 50, rating: 4.1, seller: "Guntur Farms", img: "🌶️", desc: "Fresh hot green chillies from Andhra Pradesh." },
  { id: 8, name: "Sugarcane Jaggery", category: "Sweeteners", price: 60, unit: "kg", stock: 90, rating: 4.9, seller: "UP Khand", img: "🍬", desc: "Pure organic jaggery, no chemicals added." },
  { id: 9, name: "Moong Dal", category: "Pulses", price: 110, unit: "kg", stock: 75, rating: 4.4, seller: "Rajasthan Pulses", img: "🫘", desc: "Premium green moong dal, protein-rich." },
  { id: 10, name: "Garlic", category: "Vegetables", price: 70, unit: "kg", stock: 120, rating: 4.5, seller: "MP Farms", img: "🧄", desc: "Healthy fresh garlic bulbs, strong aroma." },
];

const initialEquipments = [
  { id: 101, name: "Tractor Cultivator", category: "Tillage", price: 35000, unit: "piece", stock: 10, rating: 4.6, seller: "AgriMech India", img: "🚜", desc: "Heavy-duty 7-tyne cultivator for deep tillage." },
  { id: 102, name: "Drip Irrigation Kit", category: "Irrigation", price: 8500, unit: "set", stock: 25, rating: 4.8, seller: "WaterSmart", img: "💧", desc: "Complete drip irrigation kit for 1 acre, water-saving." },
  { id: 103, name: "Seed Drill Machine", category: "Sowing", price: 22000, unit: "piece", stock: 8, rating: 4.5, seller: "Agro Tools Ltd", img: "🌱", desc: "9-row seed drill for precision sowing." },
  { id: 104, name: "Power Sprayer", category: "Spraying", price: 3200, unit: "piece", stock: 40, rating: 4.3, seller: "SprayMaster", img: "🪣", desc: "16L battery-powered backpack sprayer." },
  { id: 105, name: "Rotavator Blades (Set)", category: "Tillage", price: 4500, unit: "set", stock: 30, rating: 4.7, seller: "AgriMech India", img: "⚙️", desc: "Set of 36 L-type rotavator blades, durable steel." },
  { id: 106, name: "Mini Rice Thresher", category: "Harvesting", price: 18000, unit: "piece", stock: 5, rating: 4.4, seller: "HarvestTech", img: "🌾", desc: "500 kg/hr capacity portable rice thresher." },
  { id: 107, name: "Solar Fence Controller", category: "Protection", price: 6500, unit: "piece", stock: 15, rating: 4.2, seller: "FarmGuard", img: "☀️", desc: "Solar-powered electric fence to protect crops from animals." },
  { id: 108, name: "Hand Weeder", category: "Weeding", price: 350, unit: "piece", stock: 100, rating: 4.6, seller: "Agro Tools Ltd", img: "🔧", desc: "Ergonomic hand weeder for row crops." },
  { id: 109, name: "Soil pH Tester", category: "Testing", price: 1200, unit: "piece", stock: 50, rating: 4.5, seller: "AgriSense", img: "🧪", desc: "Digital soil pH and moisture tester, easy to use." },
  { id: 110, name: "Greenhouse Shade Net", category: "Protection", price: 2800, unit: "roll", stock: 20, rating: 4.3, seller: "PolyFarm", img: "🏠", desc: "50% shade net, UV-stabilized, 4m x 50m roll." },
];

const CATEGORIES_GROCERY = ["All", "Grains", "Vegetables", "Oils", "Spices", "Sweeteners", "Pulses"];
const CATEGORIES_EQUIP = ["All", "Tillage", "Irrigation", "Sowing", "Spraying", "Harvesting", "Protection", "Weeding", "Testing"];

const StarRating = ({ rating }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#f59e0b" : "#d1d5db", fontSize: 13 }}>★</span>
      ))}
      <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 3 }}>{rating}</span>
    </div>
  );
};

const Toast = ({ msg, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 2500); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)",
      background: "#166534", color: "#fff", padding: "12px 28px", borderRadius: 30,
      fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 15,
      boxShadow: "0 8px 30px rgba(0,0,0,0.25)", zIndex: 9999,
      animation: "fadeUp 0.3s ease"
    }}>{msg}</div>
  );
};

export default function AgriMart() {
  const [tab, setTab] = useState("home");
  const [storeTab, setStoreTab] = useState("grocery");
  const [grocery, setGrocery] = useState(initialGrocery);
  const [equipments, setEquipments] = useState(initialEquipments);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormType, setAddFormType] = useState("grocery");
  const [orders, setOrders] = useState([]);
  const [showCartPanel, setShowCartPanel] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "", category: "", price: "", unit: "", stock: "", seller: "", desc: "", img: "📦"
  });

  const showToast = (msg) => setToast(msg);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`🛒 ${product.name} added to cart!`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const has = prev.find(i => i.id === product.id);
      if (has) { showToast(`💔 Removed from wishlist`); return prev.filter(i => i.id !== product.id); }
      showToast(`❤️ Added to wishlist!`); return [...prev, product];
    });
  };

  const placeOrder = () => {
    if (!cart.length) return;
    const order = { id: Date.now(), items: [...cart], total: cartTotal, date: new Date().toLocaleDateString(), status: "Confirmed" };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setShowCartPanel(false);
    showToast("✅ Order placed successfully!");
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.category) { showToast("⚠️ Please fill required fields!"); return; }
    const item = {
      ...newItem, id: Date.now(), price: Number(newItem.price), stock: Number(newItem.stock) || 50,
      rating: 4.0
    };
    if (addFormType === "grocery") setGrocery(prev => [...prev, item]);
    else setEquipments(prev => [...prev, item]);
    setNewItem({ name: "", category: "", price: "", unit: "", stock: "", seller: "", desc: "", img: "📦" });
    setShowAddForm(false);
    showToast(`✅ ${item.name} added to store!`);
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const products = storeTab === "grocery" ? grocery : equipments;
  const categories = storeTab === "grocery" ? CATEGORIES_GROCERY : CATEGORIES_EQUIP;

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.seller.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const emojis = ["🌱","🌾","🥕","🍅","🫘","🧅","🌿","🌽","🍆","🥦"];

  return (
    <div style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f0fdf4", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f0fdf4; } ::-webkit-scrollbar-thumb { background: #86efac; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform: translateX(-50%) translateY(20px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes popIn { from { opacity:0; transform: scale(0.92); } to { opacity:1; transform: scale(1); } }
        .card-hover { transition: transform 0.18s, box-shadow 0.18s; cursor: pointer; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(22,101,52,0.13) !important; }
        .btn-primary { background: linear-gradient(135deg, #16a34a, #15803d); color: #fff; border: none; border-radius: 10px; padding: 10px 22px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 14px; cursor: pointer; transition: all 0.15s; }
        .btn-primary:hover { background: linear-gradient(135deg, #15803d, #14532d); transform: scale(1.03); }
        .btn-outline { background: transparent; color: #16a34a; border: 2px solid #16a34a; border-radius: 10px; padding: 8px 18px; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.15s; }
        .btn-outline:hover { background: #16a34a; color: #fff; }
        .nav-link { background: none; border: none; cursor: pointer; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 15px; padding: 8px 16px; border-radius: 10px; transition: all 0.15s; color: #fff; }
        .nav-link:hover, .nav-link.active { background: rgba(255,255,255,0.2); }
        input, select, textarea { font-family: 'Nunito', sans-serif; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: "linear-gradient(135deg, #15803d 0%, #166534 60%, #14532d 100%)", padding: "0 24px", height: 65, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 32 }}>🌿</span>
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1 }}>AgriMart</div>
            <div style={{ fontSize: 10, color: "#bbf7d0", fontWeight: 600, letterSpacing: 1 }}>KISAN KA BAZAAR</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          {["home","store","orders","wishlist","about"].map(t => (
            <button key={t} className={`nav-link ${tab === t ? "active" : ""}`} onClick={() => setTab(t)} style={{ textTransform: "capitalize" }}>
              {t === "home" ? "🏠 Home" : t === "store" ? "🛒 Store" : t === "orders" ? "📦 Orders" : t === "wishlist" ? `❤️ Wishlist${wishlist.length ? ` (${wishlist.length})` : ""}` : "ℹ️ About"}
            </button>
          ))}
        </div>

        <button onClick={() => setShowCartPanel(true)} style={{ background: "#fff", border: "none", borderRadius: 12, padding: "8px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: 15, color: "#15803d", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", transition: "all 0.15s" }}>
          🛒 Cart {cartCount > 0 && <span style={{ background: "#ef4444", color: "#fff", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{cartCount}</span>}
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>

        {/* HOME TAB */}
        {tab === "home" && (
          <div>
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #dcfce7, #bbf7d0 40%, #86efac)", borderRadius: 24, margin: "28px 0 24px", padding: "48px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", right: 0, top: 0, fontSize: 200, opacity: 0.08, lineHeight: 1 }}>🌾</div>
              <div style={{ maxWidth: 560, zIndex: 1 }}>
                <div style={{ background: "#16a34a", color: "#fff", display: "inline-block", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 12 }}>🌟 INDIA'S #1 FARM MARKETPLACE</div>
                <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 44, fontWeight: 800, color: "#14532d", lineHeight: 1.15, marginBottom: 16 }}>From Farm to <span style={{ color: "#16a34a" }}>Your Door</span> 🌿</h1>
                <p style={{ fontSize: 17, color: "#166534", fontWeight: 600, marginBottom: 28, lineHeight: 1.6 }}>Shop fresh farm produce, groceries & professional farming equipment — all in one place. Trusted by 50,000+ farmers.</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <button className="btn-primary" style={{ fontSize: 16, padding: "13px 30px" }} onClick={() => { setTab("store"); setStoreTab("grocery"); }}>🛒 Shop Grocery</button>
                  <button className="btn-outline" style={{ fontSize: 16, padding: "13px 30px" }} onClick={() => { setTab("store"); setStoreTab("equipment"); }}>⚙️ Farm Equipment</button>
                </div>
              </div>
              <div style={{ fontSize: 120, zIndex: 1, animation: "popIn 0.5s ease" }}>👨‍🌾</div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
              {[
                { icon: "🌾", num: "50,000+", label: "Happy Farmers", bg: "#dcfce7" },
                { icon: "🛒", num: grocery.length + "+", label: "Grocery Items", bg: "#dbeafe" },
                { icon: "⚙️", num: equipments.length + "+", label: "Farm Tools", bg: "#fef3c7" },
                { icon: "🚚", num: "Free", label: "Delivery on ₹999+", bg: "#fce7f3" },
              ].map((s, i) => (
                <div key={i} style={{ background: s.bg, borderRadius: 18, padding: "22px 20px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: 36, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 26, fontWeight: 800, color: "#14532d" }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: "#166534", fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 24, fontWeight: 800, color: "#14532d", marginBottom: 16 }}>Shop by Category</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, marginBottom: 32 }}>
              {[
                { icon: "🌾", label: "Grains & Rice", color: "#fef3c7", tab: "grocery", cat: "Grains" },
                { icon: "🍅", label: "Fresh Veggies", color: "#fee2e2", tab: "grocery", cat: "Vegetables" },
                { icon: "🫙", label: "Oils & Ghee", color: "#fde68a", tab: "grocery", cat: "Oils" },
                { icon: "🌿", label: "Spices", color: "#dcfce7", tab: "grocery", cat: "Spices" },
                { icon: "🚜", label: "Tractors & Tools", color: "#dbeafe", tab: "equipment", cat: "Tillage" },
                { icon: "💧", label: "Irrigation", color: "#e0f2fe", tab: "equipment", cat: "Irrigation" },
              ].map((c, i) => (
                <div key={i} className="card-hover" onClick={() => { setTab("store"); setStoreTab(c.tab); setCatFilter(c.cat); }}
                  style={{ background: c.color, borderRadius: 16, padding: "20px 12px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.07)", cursor: "pointer" }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#14532d" }}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Featured Products */}
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 24, fontWeight: 800, color: "#14532d", marginBottom: 16 }}>🔥 Featured Products</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 32 }}>
              {[...grocery.slice(0,3), ...equipments.slice(0,2)].map(p => (
                <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} onView={() => setSelectedProduct(p)} onWishlist={() => toggleWishlist(p)} wishlisted={!!wishlist.find(i => i.id === p.id)} />
              ))}
            </div>

            {/* Add Item Banner */}
            <div style={{ background: "linear-gradient(135deg, #14532d, #15803d)", borderRadius: 20, padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div>
                <h3 style={{ color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>🌱 Are you a Farmer or Seller?</h3>
                <p style={{ color: "#bbf7d0", fontSize: 15, fontWeight: 600 }}>List your produce or equipment on AgriMart and reach thousands of buyers!</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-primary" style={{ background: "#fff", color: "#15803d" }} onClick={() => { setShowAddForm(true); setAddFormType("grocery"); }}>+ Add Grocery Item</button>
                <button className="btn-outline" style={{ borderColor: "#fff", color: "#fff" }} onClick={() => { setShowAddForm(true); setAddFormType("equipment"); }}>+ Add Equipment</button>
              </div>
            </div>
          </div>
        )}

        {/* STORE TAB */}
        {tab === "store" && (
          <div style={{ paddingTop: 24 }}>
            {/* Store Toggle */}
            <div style={{ display: "flex", gap: 12, marginBottom: 22, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", background: "#fff", borderRadius: 14, padding: 4, boxShadow: "0 2px 10px rgba(0,0,0,0.08)", gap: 4 }}>
                <button onClick={() => { setStoreTab("grocery"); setCatFilter("All"); }} style={{ padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: 15, background: storeTab === "grocery" ? "linear-gradient(135deg, #16a34a, #15803d)" : "transparent", color: storeTab === "grocery" ? "#fff" : "#374151", transition: "all 0.2s" }}>
                  🥕 Grocery Store
                </button>
                <button onClick={() => { setStoreTab("equipment"); setCatFilter("All"); }} style={{ padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: 15, background: storeTab === "equipment" ? "linear-gradient(135deg, #16a34a, #15803d)" : "transparent", color: storeTab === "equipment" ? "#fff" : "#374151", transition: "all 0.2s" }}>
                  ⚙️ Farm Equipment
                </button>
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`🔍 Search ${storeTab === "grocery" ? "groceries" : "equipment"}...`}
                  style={{ width: "100%", padding: "11px 18px", borderRadius: 12, border: "2px solid #bbf7d0", fontSize: 14, background: "#fff", fontFamily: "'Nunito',sans-serif", fontWeight: 600, outline: "none", color: "#1a1a1a" }} />
              </div>
              <button className="btn-primary" onClick={() => { setShowAddForm(true); setAddFormType(storeTab); }}>
                + Add {storeTab === "grocery" ? "Grocery" : "Equipment"}
              </button>
            </div>

            {/* Category Pills */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {categories.map(c => (
                <button key={c} onClick={() => setCatFilter(c)} style={{ padding: "7px 18px", borderRadius: 20, border: "2px solid", borderColor: catFilter === c ? "#16a34a" : "#d1fae5", background: catFilter === c ? "#16a34a" : "#fff", color: catFilter === c ? "#fff" : "#15803d", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.15s" }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, fontWeight: 600 }}>
              Showing {filtered.length} {storeTab === "grocery" ? "grocery items" : "equipment"} {catFilter !== "All" ? `in "${catFilter}"` : ""}
            </div>

            {/* Product Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18, marginBottom: 32 }}>
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} onView={() => setSelectedProduct(p)} onWishlist={() => toggleWishlist(p)} wishlisted={!!wishlist.find(i => i.id === p.id)} />
              ))}
              {filtered.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
                  <div style={{ fontSize: 60, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>No products found</div>
                  <div style={{ fontSize: 14 }}>Try a different search or category</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <div style={{ paddingTop: 28 }}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 26, fontWeight: 800, color: "#14532d", marginBottom: 20 }}>📦 My Orders</h2>
            {orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", background: "#fff", borderRadius: 20 }}>
                <div style={{ fontSize: 70, marginBottom: 16 }}>📦</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#374151", marginBottom: 8 }}>No orders yet!</div>
                <div style={{ color: "#9ca3af", fontSize: 15, marginBottom: 20 }}>Your order history will appear here.</div>
                <button className="btn-primary" onClick={() => setTab("store")}>Start Shopping</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {orders.map(o => (
                  <div key={o.id} style={{ background: "#fff", borderRadius: 18, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <div>
                        <span style={{ fontWeight: 800, color: "#14532d", fontSize: 15 }}>Order #{o.id.toString().slice(-6)}</span>
                        <span style={{ marginLeft: 12, color: "#9ca3af", fontSize: 13 }}>{o.date}</span>
                      </div>
                      <span style={{ background: "#dcfce7", color: "#16a34a", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 800 }}>✅ {o.status}</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                      {o.items.map(item => (
                        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f0fdf4", borderRadius: 10, padding: "8px 14px" }}>
                          <span style={{ fontSize: 22 }}>{item.img}</span>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>{item.name}</span>
                          <span style={{ fontSize: 13, color: "#6b7280" }}>×{item.qty}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontWeight: 800, color: "#15803d", fontSize: 16 }}>Total: ₹{o.total.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WISHLIST TAB */}
        {tab === "wishlist" && (
          <div style={{ paddingTop: 28 }}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 26, fontWeight: 800, color: "#14532d", marginBottom: 20 }}>❤️ My Wishlist</h2>
            {wishlist.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", background: "#fff", borderRadius: 20 }}>
                <div style={{ fontSize: 70, marginBottom: 16 }}>❤️</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#374151", marginBottom: 8 }}>Wishlist is empty!</div>
                <button className="btn-primary" onClick={() => setTab("store")}>Explore Store</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
                {wishlist.map(p => (
                  <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} onView={() => setSelectedProduct(p)} onWishlist={() => toggleWishlist(p)} wishlisted={true} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABOUT TAB */}
        {tab === "about" && (
          <div style={{ paddingTop: 28, maxWidth: 800, margin: "0 auto" }}>
            <div style={{ background: "linear-gradient(135deg, #dcfce7, #bbf7d0)", borderRadius: 24, padding: "40px", textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 72, marginBottom: 12 }}>🌿</div>
              <h1 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 36, fontWeight: 800, color: "#14532d" }}>About AgriMart</h1>
              <p style={{ fontSize: 17, color: "#166534", marginTop: 12, fontWeight: 600, lineHeight: 1.7 }}>AgriMart is India's premier agriculture management platform connecting farmers, buyers, and equipment dealers on one powerful marketplace.</p>
            </div>
            {[
              { icon: "🌾", title: "Grocery Store", desc: "Buy and sell fresh farm produce, grains, spices, oils, and more directly from farmers." },
              { icon: "⚙️", title: "Equipment Store", desc: "Buy, sell and rent farming equipment — from tractors to soil testers — at competitive prices." },
              { icon: "👨‍🌾", title: "Farmer Empowerment", desc: "We empower farmers to list their products, manage inventory, and reach customers directly." },
              { icon: "🚚", title: "Fast Delivery", desc: "Free delivery on orders above ₹999. Pan-India shipping within 3-5 business days." },
            ].map((f, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "22px 28px", display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 42 }}>{f.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "#14532d", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ color: "#374151", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CART PANEL */}
      {showCartPanel && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={() => setShowCartPanel(false)} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 420, background: "#fff", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", animation: "slideIn 0.3s ease" }}>
            <div style={{ background: "linear-gradient(135deg, #15803d, #14532d)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#fff", fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 20 }}>🛒 Your Cart ({cartCount})</span>
              <button onClick={() => setShowCartPanel(false)} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div style={{ fontSize: 60, marginBottom: 12 }}>🛒</div>
                  <div style={{ fontWeight: 700, color: "#374151" }}>Cart is empty!</div>
                </div>
              ) : cart.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #f0fdf4" }}>
                  <div style={{ fontSize: 36 }}>{item.img}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#14532d" }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>₹{item.price}/{item.unit}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ width: 26, height: 26, borderRadius: "50%", border: "2px solid #16a34a", background: "#fff", color: "#16a34a", fontSize: 16, cursor: "pointer", fontWeight: 800 }}>-</button>
                      <span style={{ fontWeight: 800, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ width: 26, height: 26, borderRadius: "50%", border: "none", background: "#16a34a", color: "#fff", fontSize: 16, cursor: "pointer", fontWeight: 800 }}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: "#15803d" }}>₹{(item.price * item.qty).toLocaleString()}</div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 12, fontWeight: 700, marginTop: 4 }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: "16px 24px", borderTop: "2px solid #f0fdf4" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: "#374151" }}>Subtotal:</span>
                  <span style={{ fontWeight: 800, color: "#15803d", fontSize: 18 }}>₹{cartTotal.toLocaleString()}</span>
                </div>
                {cartTotal >= 999 && <div style={{ background: "#dcfce7", color: "#16a34a", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 700, marginBottom: 12, textAlign: "center" }}>🎉 Free delivery applied!</div>}
                <button className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 16 }} onClick={placeOrder}>
                  ✅ Place Order — ₹{cartTotal.toLocaleString()}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setSelectedProduct(null)} />
          <div style={{ position: "relative", background: "#fff", borderRadius: 24, padding: "36px", maxWidth: 520, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", animation: "popIn 0.25s ease", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => setSelectedProduct(null)} style={{ position: "absolute", top: 16, right: 16, background: "#f1f5f9", border: "none", width: 32, height: 32, borderRadius: "50%", fontSize: 18, cursor: "pointer" }}>×</button>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 90, marginBottom: 8 }}>{selectedProduct.img}</div>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 24, color: "#14532d" }}>{selectedProduct.name}</h2>
              <div style={{ color: "#16a34a", fontWeight: 700, fontSize: 13, marginTop: 4 }}>{selectedProduct.category} • {selectedProduct.seller}</div>
            </div>
            <StarRating rating={selectedProduct.rating} />
            <p style={{ color: "#374151", fontSize: 15, margin: "14px 0", lineHeight: 1.7 }}>{selectedProduct.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0fdf4", borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>Price</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 28, fontWeight: 800, color: "#15803d" }}>₹{selectedProduct.price}<span style={{ fontSize: 14, color: "#6b7280", fontWeight: 600 }}>/{selectedProduct.unit}</span></div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>In Stock</div>
                <div style={{ fontWeight: 800, color: "#16a34a", fontSize: 18 }}>{selectedProduct.stock} {selectedProduct.unit}s</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>🛒 Add to Cart</button>
              <button className="btn-outline" onClick={() => { toggleWishlist(selectedProduct); }}>
                {wishlist.find(i => i.id === selectedProduct.id) ? "❤️" : "🤍"} Wishlist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD ITEM MODAL */}
      {showAddForm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setShowAddForm(false)} />
          <div style={{ position: "relative", background: "#fff", borderRadius: 24, padding: "36px", maxWidth: 520, width: "92%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", animation: "popIn 0.25s ease", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => setShowAddForm(false)} style={{ position: "absolute", top: 16, right: 16, background: "#f1f5f9", border: "none", width: 32, height: 32, borderRadius: "50%", fontSize: 18, cursor: "pointer" }}>×</button>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 22, color: "#14532d", marginBottom: 6 }}>
              {addFormType === "grocery" ? "🥕 Add Grocery Item" : "⚙️ Add Farm Equipment"}
            </h2>
            <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 22 }}>List your product on AgriMart marketplace</p>

            {/* Emoji Picker Row */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Select Icon</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(addFormType === "grocery"
                  ? ["🌾","🍅","🧅","🌽","🍆","🫘","🌿","🧄","🫙","🍬","🥕","🌶️"]
                  : ["🚜","💧","⚙️","🔧","🌱","🪣","☀️","🏠","🧪","🔩","⛏️","🛠️"]
                ).map(e => (
                  <button key={e} onClick={() => setNewItem(p => ({ ...p, img: e }))}
                    style={{ fontSize: 24, background: newItem.img === e ? "#dcfce7" : "#f9fafb", border: newItem.img === e ? "2px solid #16a34a" : "2px solid transparent", borderRadius: 10, padding: "6px 10px", cursor: "pointer" }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {[
              { label: "Product Name *", field: "name", type: "text", placeholder: "e.g. Organic Wheat" },
              { label: "Seller / Farm Name *", field: "seller", type: "text", placeholder: "e.g. Punjab Farms" },
              { label: "Price (₹) *", field: "price", type: "number", placeholder: "e.g. 45" },
              { label: "Unit *", field: "unit", type: "text", placeholder: "e.g. kg, litre, piece" },
              { label: "Stock Quantity", field: "stock", type: "number", placeholder: "e.g. 100" },
            ].map(f => (
              <div key={f.field} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>{f.label}</label>
                <input type={f.type} value={newItem[f.field]} onChange={e => setNewItem(p => ({ ...p, [f.field]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 14, outline: "none", transition: "border 0.15s" }}
                  onFocus={e => e.target.style.borderColor = "#16a34a"}
                  onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
              </div>
            ))}

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Category *</label>
              <select value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 14, outline: "none" }}>
                <option value="">Select category...</option>
                {(addFormType === "grocery" ? CATEGORIES_GROCERY : CATEGORIES_EQUIP).filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 5 }}>Description</label>
              <textarea value={newItem.desc} onChange={e => setNewItem(p => ({ ...p, desc: e.target.value }))}
                placeholder="Describe your product..." rows={3}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 14, outline: "none", resize: "vertical" }} />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ flex: 1, padding: "13px" }} onClick={handleAddItem}>✅ List Product</button>
              <button className="btn-outline" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* FOOTER */}
      <footer style={{ background: "#14532d", color: "#bbf7d0", padding: "24px", textAlign: "center", marginTop: 40 }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🌿 AgriMart</div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>India's #1 Agriculture Marketplace • Empowering Farmers Since 2024</div>
        <div style={{ fontSize: 12, marginTop: 8, opacity: 0.7 }}>© 2024 AgriMart. All rights reserved. | Grocery Store | Farm Equipment | Kisan Ka Bazaar</div>
      </footer>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, onAdd, onView, onWishlist, wishlisted }) {
  return (
    <div className="card-hover" style={{ background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 14px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", border: "1px solid #f0fdf4" }}>
      <div onClick={onView} style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", padding: "28px 16px", textAlign: "center", cursor: "pointer", position: "relative" }}>
        <button onClick={e => { e.stopPropagation(); onWishlist(); }} style={{ position: "absolute", top: 10, right: 10, background: "white", border: "none", width: 30, height: 30, borderRadius: "50%", fontSize: 16, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {wishlisted ? "❤️" : "🤍"}
        </button>
        <div style={{ fontSize: 56 }}>{product.img}</div>
        <div style={{ background: "#dcfce7", color: "#16a34a", borderRadius: 12, padding: "2px 10px", fontSize: 11, fontWeight: 800, display: "inline-block", marginTop: 6 }}>{product.category}</div>
      </div>
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div onClick={onView} style={{ cursor: "pointer" }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#14532d", marginBottom: 3, lineHeight: 1.3 }}>{product.name}</div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6, fontWeight: 600 }}>by {product.seller}</div>
        </div>
        <div style={{ marginBottom: 10 }}><StarRating rating={product.rating} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 20, color: "#15803d" }}>₹{product.price}<span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>/{product.unit}</span></span>
          <span style={{ fontSize: 11, color: product.stock > 20 ? "#16a34a" : "#f59e0b", fontWeight: 700 }}>{product.stock > 20 ? "✅ In Stock" : `⚠️ ${product.stock} left`}</span>
        </div>
        <button className="btn-primary" style={{ width: "100%", marginTop: "auto" }} onClick={onAdd}>+ Add to Cart</button>
      </div>
    </div>
  );
}