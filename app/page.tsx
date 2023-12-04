import Image from "next/image";
import { Button } from "@/components/ui/button";
import ChatComponent from "@/components/ChatComponent";

const ProductPage = () => {
  return (
    <div className="p-4">
      <ChatComponent lessonId="5" />
    </div>
  );
};

export default ProductPage;
