import { Switch } from "../ui/switch";

// Define the type for props
interface SwitchbBTNProps {
  is_active: boolean; // is_active is expected to be a boolean
}

export function SwitchbBTN({ is_active }: SwitchbBTNProps) {
  return (
    <div className="flex items-start justify-end space-x-2">
      <Switch id="airplane-mode" checked={is_active} />
    </div>
  );
}
