import { useState } from "react";
export default () => {
    const columns = [
        {
            value: "id",
            text: "ID",
            style: {
                textAlign: "center",
            },
        },
        {
            value: "name",
            text: "Ten",
            style: {
                textAlign: "center",
            },
        },
        {
            value: "age",
            text: "Tuoi",
            style: {
                color: "red",
                textAlign: "center",
            },
        },
        {
            value: "class",
            text: "Lop",
            style: {
                textAlign: "center",
            },
        },
        {
            value: "address",
            text: "Dia Chi",
            style: {
                textAlign: "center",
            },
        },
        {
            value: "action",
            text: "Thao tac",
            style: {
                textAlign: "center",
            },
        },
    ];

    const [students, setStudents] = useState([
        {
            id: 1,
            name: "Nguyen Van A",
            age: 15,
            class: "10A1",
            address: "Ha Noi",
        },
        {
            id: 2,
            name: "Tran Thi B",
            age: 16,
            class: "10A2",
            address: "Hai Phong",
        },
        { id: 3, name: "Le Van C", age: 15, class: "10A1", address: "Da Nang" },
        {
            id: 4,
            name: "Pham Thi D",
            age: 17,
            class: "11A1",
            address: "Ha Noi",
        },
        {
            id: 5,
            name: "Hoang Van E",
            age: 16,
            class: "10A3",
            address: "Nam Dinh",
        },
        {
            id: 6,
            name: "Do Thi F",
            age: 15,
            class: "10A2",
            address: "Thai Binh",
        },
        {
            id: 7,
            name: "Bui Van G",
            age: 17,
            class: "11A2",
            address: "Hai Duong",
        },
        { id: 8, name: "Vu Thi H", age: 16, class: "10A3", address: "Ha Noi" },
        {
            id: 9,
            name: "Dang Van I",
            age: 15,
            class: "10A1",
            address: "Bac Ninh",
        },
        {
            id: 10,
            name: "Ngo Thi K",
            age: 17,
            class: "11A1",
            address: "Ha Nam",
        },
    ]);

    const onRemove = (id) => {
        const isConfirm = window.confirm("Ban co chac chan muon xoa khong?");
        if (!isConfirm) return;
        setStudents((prevStudents)=> prevStudents.filter((student) => student.id !== id));
    };

    return (
        <table width="100%" cellPadding={0} cellSpacing={0} border={1}>
            <thead>
                <tr>
                    {columns.map((column) => {
                        return <th key={column.value}>{column.text}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {students.map((student) => {
                    return (
                        <tr key={student.id}>
                            {columns.map((column) => {
                                if (column.value === "action") {
                                    return (
                                        <td
                                            key={column.value}
                                            style={{ textAlign: "center" }}
                                        >
                                            <button
                                                onClick={() =>
                                                    onRemove(student.id)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    );
                                }
                                return (
                                    <td style={column.style} key={column.value}>
                                        {student[column.value]}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
