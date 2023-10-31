import { FaFire } from 'react-icons/fa/index.js';

export function SideBar() {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-16 flex-col bg-white text-white shadow-lg dark:bg-gray-700">
      <SideBarIcon icon={<FaFire size="28" />} />
      <SideBarIcon icon={<FaFire size="28" />} />
      <SideBarIcon icon={<FaFire size="28" />} />
      <SideBarIcon icon={<FaFire size="28" />} />
    </div>
  );
}

const SideBarIcon = ({
  icon,
  text = 'tooltip 💡',
}: {
  icon: JSX.Element;
  text?: string;
}) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);
