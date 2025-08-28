"use client"
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TNote } from "@/types/note";
import { FilePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type TInput = {
    title: string,
    content: String
}
const Todo = () => {
    const [data, setData] = useState<TNote[]>([])

    const getNotes = async () => {
        try {
            const res = await fetch("https://note-app-5ypa.onrender.com/api/notes");
            const data = await res.json()
            setData(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getNotes()
    }, [])

    const createNote = async (title: string, content: string) => {
        try {
            const response = await fetch("https://note-app-5ypa.onrender.com/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    contet: content
                })
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            } else (
                console.log(response.status)

            )
        } catch (error) {
            console.error(error)
        }
    }

    const { handleSubmit, watch, formState: { errors } } = useForm<TInput>();
    const onSubmit: SubmitHandler<TInput> = data => console.log(data);

    return (
        <div className="flex flex-wrap gap-6">
            {data?.map((note: TNote) => (
                <Card key={note._id} className="p-6 my-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <p className="text-xl font-medium">
                                {note.title}
                            </p>
                            <strong>{note.content}</strong>
                        </div>
                        <div>
                            <Dialog>
                                <DialogTrigger className="cursor-pointer">
                                    <FilePlus />
                                </DialogTrigger>
                                <form>
                                    <DialogContent>
                                        <Input />
                                    </DialogContent>
                                </form>
                            </Dialog>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default Todo