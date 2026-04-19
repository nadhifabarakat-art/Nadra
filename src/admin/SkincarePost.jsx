import { useState } from "react";
import skincare from "../pages/skincare.js";
import "./sidebar.css";

const SkincarePost = () => {
    const [posts, setPosts] = useState(skincare);
    const [editingPost, setEditingPost] = useState(null);
    const [form, setForm] = useState({ name: "", content: "", duration: "", price: "" });
    const [showForm, setShowForm] = useState(false);

    const deletePost = (id) => {
        if (window.confirm("متأكدة تحذفي؟")) {
            setPosts(posts.filter((p) => p.id !== id));
        }
    };

    const startEdit = (post) => {
        setEditingPost(post.id);
        setForm({ name: post.name, content: post.content, duration: post.duration, price: post.price });
        setShowForm(true);
    };

    const savePost = () => {
        setPosts(posts.map((p) =>
            p.id === editingPost ? { ...p, ...form } : p
        ));
        setShowForm(false);
        setEditingPost(null);
        setForm({ name: "", content: "", duration: "", price: "" });
    };

    return (
        <div className="skincare-admin-container">
            <h2>Skincare Posts</h2>

            {showForm && (
                <div className="skincare-admin-form">
                    <input className="skincare-admin-input" placeholder="الاسم" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <textarea className="skincare-admin-input" placeholder="المحتوى" value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })} />
                    <input className="skincare-admin-input" placeholder="المدة" value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                    <input className="skincare-admin-input" placeholder="السعر" value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    <div className="skincare-admin-buttons">
                        <button className="btn-save" onClick={savePost}>حفظ</button>
                        <button className="btn-cancel" onClick={() => setShowForm(false)}>إلغاء</button>
                    </div>
                </div>
            )}

            {posts.map((post) => (
                <div key={post.id} className="skincare-admin-card">
                    <h3>{post.name}</h3>
                    <p>{post.content}</p>
                    <p className="duration">⏱️ {post.duration}</p>
                    <p className="price">💰 {post.price} €</p>
                    <div className="skincare-admin-card-buttons">
                        <button className="btn-edit" onClick={() => startEdit(post)}> تعديل</button>
                        <button className="btn-delete" onClick={() => deletePost(post.id)}> حذف</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkincarePost;