import ChatComponent from "@/components/ChatComponent";
import LanguageSelector from "@/components/LanguageSelector";

const ProductPage = () => {
  return (
    <div className="p-4 flex flex-col">
      <div className="flex justify-end pb-6">
        <LanguageSelector />
      </div>
      <div>
        <ChatComponent lessonId="5" />
      </div>
    </div>
  );
};

export default ProductPage;
