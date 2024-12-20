import { MdKeyboardArrowDown } from 'react-icons/md';
import BudgetFilter from "@/app/(dashboard)/search/components/buget";

interface BudgetDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function BudgetDropdown({ isOpen, onToggle }: BudgetDropdownProps) {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 border-2 border-[#0073C6] text-[#0073C6] rounded-full hover:bg-[#0073C6]/5"
        onClick={onToggle}
      >
        Budget
        <MdKeyboardArrowDown className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-full bg-white rounded-lg shadow-lg border z-50">
          <div className="space-y-2 h-full">
            <BudgetFilter />
          </div>
        </div>
      )}
    </div>
  );
}

