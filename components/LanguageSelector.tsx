"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    // Fetch the current language from the database
    fetch(`http://localhost:3002/selectedLanguage`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.current) {
          setSelectedLanguage(data.current); // Set the fetched language as the default value
        }
      })
      .catch((error) => {
        console.error("Error fetching current language:", error);
      });
  }, []);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    updateLanguageInDatabase(value);
  };

  const updateLanguageInDatabase = (language: string) => {
    fetch(`http://localhost:3002/selectedLanguage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ current: language }),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Language updated successfully");
      })
      .catch((error) => {
        console.error("Error updating language:", error);
        toast.error("Error updating language");
      });
  };

  return (
    <Select onValueChange={handleLanguageChange}>
      <ToastContainer position="bottom-right" />
      <SelectTrigger className="w-[180px] pb-2">
        <SelectValue placeholder={selectedLanguage} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="English">English</SelectItem>
        <SelectItem value="Spanish">Spanish</SelectItem>
        <SelectItem value="Turkish">Turkish</SelectItem>
        <SelectItem value="French">French</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
