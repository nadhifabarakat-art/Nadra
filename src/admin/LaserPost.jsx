import { useState } from "react";
import laser from "../pages/laser.js";
import "./sidebar.css";

const LaserPost = () => {
    const [posts, setPosts] = useState(laser);
    const [editingPost, setEditingPost] = useState(null);
    const [form, setForm] = useState({ title: "", shortContent: "", content: "", price: "" });
    const [showForm, setShowForm] = useState(false);

    const deletePost = (id) => {
        if (window.confirm("متأكدة تحذفي؟")) {
            setPosts(posts.filter((p) => p.id !== id));
        }
    };

    const startEdit = (post) => {
        setEditingPost(post.id);
        setForm({ title: post.title, shortContent: post.shortContent, content: post.content, price: post.price });
        setShowForm(true);
    };

    const savePost = () => {
        setPosts(posts.map((p) =>
            p.id === editingPost ? { ...p, ...form } : p
        ));
        setShowForm(false);
        setEditingPost(null);
        setForm({ title: "", shortContent: "", content: "", price: "" });
    };

    return (
        <div className="laser-container">
            <h2>Laser Posts</h2>

            {showForm && (
                <div className="laser-form">
                    <input className="laser-input" placeholder="العنوان" value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    <input className="laser-input" placeholder="المحتوى المختصر" value={form.shortContent}
                        onChange={(e) => setForm({ ...form, shortContent: e.target.value })} />
                    <textarea className="laser-input" placeholder="المحتوى الكامل" value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })} />
                    <input className="laser-input" placeholder="السعر" value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    <div className="laser-form-buttons">
                        <button className="btn-save" onClick={savePost}>حفظ</button>
                        <button className="btn-cancel" onClick={() => setShowForm(false)}>إلغاء</button>
                    </div>
                </div>
            )}

            {posts.map((post) => (
                <div key={post.id} className="laser-card">
                    <h3>{post.title}</h3>
                    <p className="short-content">{post.shortContent}</p>
                    <p>{post.content}</p>
                    <p className="price">💰 {post.price} €</p>
                    <div className="laser-card-buttons">
                        <button className="btn-edit" onClick={() => startEdit(post)}> تعديل</button>
                        <button className="btn-delete" onClick={() => deletePost(post.id)}> حذف</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LaserPost;