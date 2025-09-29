'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getServerStatus } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Home() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [items, setItems] = useState<string[]>([]);
    function setIngredients() {
        const arrayItems = inputRef.current?.value.split(',');
        if (arrayItems)
            setItems(arrayItems);
    }

    useEffect(() => {
        getServerStatus().then(() => {
            toast.success("Server Connected !", {
                position: 'top-right'
            })
        })
    }, [])



    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <div>
                <footer>
                    <div className="flex gap-2">
                        <Input placeholder="Enter Ingredients" ref={inputRef} />
                        <Button>Get Recipies</Button>
                    </div>
                </footer>
            </div>
        </div>
    );
}
