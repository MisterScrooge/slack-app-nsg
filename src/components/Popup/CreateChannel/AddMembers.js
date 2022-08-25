import { useState } from "react";

const AddMembers = () => {
    const [tags, setTags] = useState([]);

    const handleKeyDown = (e) => {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        e.target.value = ''
    }

    return (
        <div className="tags-input-container">

            { tags.map((tag, index) => (
                <div className="tag-item">
                    <span className="text">{tag}</span>
                    <span className="close">&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" placeholder="akobudoy@uwu.com" />
        </div>
    )
}

export default AddMembers;