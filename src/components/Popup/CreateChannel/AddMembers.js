import { useState, useContext } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import "./AddMembers.css"

const AddMembers = ({tags, setTags}) => {
    const {users} = useContext(UsersContext);

    const handleKeyDown = (e) => {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;

        let idx = users.findIndex(user => user.email === value.trim());
        console.log('idx value: ', idx);

        if(idx !== -1) {
            const userObject = users[idx];
            setTags([...tags, userObject.id]);
            e.target.value = '';
            console.log(tags);
        }
    }

    const removeTag = (index) => {
        setTags(tags.filter((i) => i !== index))
    }

    return (
        <div className="tags-input-container">

            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <input onKeyDown={handleKeyDown} type="text" placeholder="...akobudoy@uwu.com" className="tags-input-box" />
        </div>
    )
}

export default AddMembers;