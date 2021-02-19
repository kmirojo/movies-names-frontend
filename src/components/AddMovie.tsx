import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const AddMovie = () => {
    const [name, setName] = useState("");
    const { socket } = useContext(SocketContext);

    const onsubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (name.trim().length > 0) {
            socket.emit("new-movie", { name });
            setName("");
        }
    };

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setName(ev.target.value);
    };

    return (
        <>
            <h3>Add Movie</h3>
            <form onSubmit={onsubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="New movie name"
                    value={name}
                    onChange={onChange}
                />
            </form>
        </>
    );
};

export default AddMovie;
