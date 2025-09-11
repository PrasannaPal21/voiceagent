"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <span className="text-lg font-bold">Menu</span>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="p-6 space-y-4">
              <div>
                <button
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900 py-2"
                  onClick={() => toggleExpanded("features")}
                >
                  Features
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedItems.includes("features") ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedItems.includes("features") && (
                  <div className="pl-4 mt-2 space-y-2">
                    <a href="#" className="block text-gray-600 py-1">
                      Voice Agents
                    </a>
                    <a href="#" className="block text-gray-600 py-1">
                      Analytics
                    </a>
                    <a href="#" className="block text-gray-600 py-1">
                      Integrations
                    </a>
                  </div>
                )}
              </div>

              <a href="#" className="block font-medium text-gray-900 py-2">
                Pricing
              </a>
              <a href="#" className="block font-medium text-gray-900 py-2">
                Documentation
              </a>

              <div>
                <button
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900 py-2"
                  onClick={() => toggleExpanded("solutions")}
                >
                  Solutions
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedItems.includes("solutions") ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedItems.includes("solutions") && (
                  <div className="pl-4 mt-2 space-y-2">
                    <a href="#" className="block text-gray-600 py-1">
                      Customer Service
                    </a>
                    <a href="#" className="block text-gray-600 py-1">
                      Sales
                    </a>
                    <a href="#" className="block text-gray-600 py-1">
                      Healthcare
                    </a>
                  </div>
                )}
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full text-left font-medium text-gray-900 py-2"
                  onClick={() => toggleExpanded("resources")}
                >
                  Resources
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedItems.includes("resources") ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedItems.includes("resources") && (
                  <div className="pl-4 mt-2 space-y-2">
                    <a href="#" className="block text-gray-600 py-1">
                      Blog
                    </a>
                    <a href="#" className="block text-gray-600 py-1">
                      Case Studies
                    </a>
                    <a href="#" className="block text-gray-600 py-1">
                      Support
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-4 space-y-3">
                <Button variant="outline" className="w-full bg-transparent">
                  CONTACT SALES
                </Button>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">LOG IN</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
