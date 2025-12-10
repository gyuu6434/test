'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const navItems = [
    { label: '전체 상품', href: '/', active: pathname === '/' && !category },
    { label: '감귤', href: '/?category=citrus', active: category === 'citrus' },
    { label: '한라봉', href: '/?category=hallabong', active: category === 'hallabong' },
    { label: '천혜향', href: '/?category=cheonhyehyang', active: category === 'cheonhyehyang' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🍊</span>
          <span className="text-xl font-bold text-orange-600">제주감귤마켓</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                item.active ? 'text-orange-600' : 'text-slate-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            disabled
            title="2단계 구현 예정"
            className="text-slate-500"
          >
            <User className="h-4 w-4 mr-1" />
            로그인
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled
            title="2단계 구현 예정"
            className="text-slate-500"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            장바구니
          </Button>
        </div>
      </div>

      <nav className="md:hidden border-t bg-white">
        <div className="container mx-auto flex overflow-x-auto px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${
                item.active
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-slate-700 hover:text-orange-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
