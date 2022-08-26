import { useState, useContext } from "react";
import { UsersContext } from "../../../contexts/UsersContext";
import "./AddMembers.css"

const AddMembers = ({tags, setTags, indexTags, setIndexTags}) => {
    const {users} = useContext(UsersContext);

    const handleKeyDown = (e) => {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;

        let idx = users.findIndex(user => user.email === value.trim());
        console.log('idx value: ', idx);

        if (idx !== -1) {
            const userObject = users[idx];
            setIndexTags([...indexTags, userObject.id]);
            console.log(tags);
            console.log(indexTags);
            setTags([...tags, value])
        } else {
            alert('😨 Please enter existing user email!')
        }
        e.target.value = '';
    }

    const removeTag = (index) => {
        setIndexTags(indexTags.filter((el, i) => i !== index));
        setTags(tags.filter((el, i) => i !== index));
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