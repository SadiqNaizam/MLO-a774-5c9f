import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input"; // Example: Search input within Sidebar
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"; // Example
import { Home, Search, Library, ListMusic, User } from 'lucide-react';

interface SidebarProps {
  // Props for dynamic content, e.g., navigation items, user info
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  console.log("Rendering Sidebar");

  // Doraemon theme: Primary blue for accents, rounded elements
  const doraBlue = "bg-blue-500 hover:bg-blue-600";
  const doraWhite = "text-white";
  const doraText = "text-gray-700"; // Or white text on blue bg

  return (
    <aside className={`w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col space-y-6 rounded-r-xl shadow-lg ${className}`}>
      <div className="text-2xl font-bold text-blue-600 mb-4">
        MusicApp
        {/* Potentially a Doraemon-themed logo here */}
      </div>

      {/* Search Input Example */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search songs, artists..."
          className="pl-10 rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Navigation Example using shadcn NavigationMenu */}
      <NavigationMenu orientation="vertical" className="w-full">
        <NavigationMenuList className="flex flex-col space-y-1 w-full">
          {[
            { href: "/", label: "Home", icon: <Home className="h-5 w-5 mr-3" /> },
            { href: "/search", label: "Search", icon: <Search className="h-5 w-5 mr-3" /> },
            { href: "/library", label: "Your Library", icon: <Library className="h-5 w-5 mr-3" /> },
            { href: "/playlists", label: "Playlists", icon: <ListMusic className="h-5 w-5 mr-3" /> },
          ].map((item) => (
            <NavigationMenuItem key={item.href} className="w-full">
              <NavigationMenuLink
                href={item.href}
                className={`flex items-center w-full p-3 rounded-lg text-sm font-medium ${doraText} hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150`}
                // activeClassName would require router integration
              >
                {item.icon}
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <ScrollArea className="flex-grow">
        {/* Placeholder for more content like playlists list */}
        <div className="mt-4 text-xs text-gray-400">
          Playlists will appear here...
        </div>
      </ScrollArea>

      <div className="mt-auto border-t pt-4">
         <NavigationMenuLink
            href="/profile"
            className={`flex items-center w-full p-3 rounded-lg text-sm font-medium ${doraText} hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150`}
          >
            <User className="h-5 w-5 mr-3" />
            User Profile
          </NavigationMenuLink>
      </div>
    </aside>
  );
}

export default Sidebar;