'use client'

import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

type Category = {
  name: string
  subcategories: string[]
}

type Filter = {
  name: string
  options: string[]
}

const categories: Category[] = [
  { name: "Vêtements", subcategories: ["T-shirts", "Pantalons", "Robes"] },
  { name: "Chaussures", subcategories: ["Baskets", "Bottes", "Sandales"] },
  { name: "Accessoires", subcategories: ["Sacs", "Bijoux", "Ceintures"] },
]

const filters: Filter[] = [
  { name: "Couleur", options: ["Rouge", "Bleu", "Vert", "Noir", "Blanc"] },
  { name: "Taille", options: ["XS", "S", "M", "L", "XL"] },
  { name: "Marque", options: ["Nike", "Adidas", "Zara", "H&M"] },
]

export function ProductFiltersComponent() {
  const [priceRange, setPriceRange] = useState([0, 1000])

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Filtres</h2>

      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="categories">
          <AccordionTrigger>Catégories</AccordionTrigger>
          <AccordionContent>
            {categories.map((category) => (
              <Accordion key={category.name} type="single" collapsible className="ml-4">
                <AccordionItem value={category.name}>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory} className="flex items-center space-x-2 ml-4">
                        <Checkbox id={subcategory} />
                        <Label htmlFor={subcategory}>{subcategory}</Label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {filters.map((filter) => (
        <div key={filter.name} className="mb-4">
          <h3 className="font-semibold mb-2">{filter.name}</h3>
          {filter.options.map((option) => (
            <div key={option} className="flex items-center space-x-2 ml-4">
              <Checkbox id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </div>
      ))}

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Prix</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{priceRange[0]}€</span>
          <span>{priceRange[1]}€</span>
        </div>
      </div>
    </div>
  )
}