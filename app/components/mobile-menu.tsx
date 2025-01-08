"use client";
import { Button } from "@/components/ui/button";
import { Sheet,SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import { navbarLinks } from "./navbar-links";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
const MobileMenu=()=>{
    const location = usePathname();
return(
    <Sheet>
        <SheetTrigger asChild>
       <Button variant="outline" size="icon"><Menu/></Button>
        </SheetTrigger>
        <SheetContent>
            <div className="mt-5 flex flex-col space-y-1">
              {
                navbarLinks.map((item)=>(
                    <Link
                    href={item.href}
                    key={item.id}
                    className={cn(location===item.href ? "bg-muted" :"hover:bg-muted hover:bg-opacity-75", "group flex items-center px-2 py-2 font-medium rounded-md")}
                  >
                    {item.name}
                  </Link>
                ))
              }
            </div>
        </SheetContent>
    </Sheet>
)
}
export default MobileMenu;