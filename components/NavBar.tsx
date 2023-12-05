"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NavItem {
  href: string;
  title: string;
  id: string;
}

interface NavBarProps {
  navItems: NavItem[];
}

const NavBar: React.FC<NavBarProps> = ({ navItems }) => {
  const pathname = usePathname();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    // Fetch completed lessons data from the API route
    fetch(`http://localhost:3002/completed`)
      .then((response) => response.json())
      .then((data) => {
        setCompletedLessons(data.map((lesson: any) => lesson.id));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const isLessonCompleted = (id: string) => {
    return completedLessons.includes(id);
  };

  return (
    <div className="flex flex-col w-full">
      {navItems.map((item) => (
        <Button
          asChild
          variant={pathname === item.href ? "secondary" : "ghost"}
          className="w-full justify-start"
          key={item.href}
        >
          <Link className="flex justify-between pr-4" href={item.href}>
            {item.title}
            {isLessonCompleted(item.id) ? (
              <CheckCircle2 color="#17A34A" className="h-5 w-5" />
            ) : null}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default NavBar;
