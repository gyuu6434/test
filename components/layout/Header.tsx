'use client';

import Link from 'next/link';
import { ShoppingCart, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import UserDropdown from '@/components/layout/UserDropdown';

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  // Get auth state
  const { user, profile, loading, signInWithGoogle, signOut } = useAuth();

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
          {loading ? (
            // Loading state: Show skeleton
            <div className="h-9 w-20 bg-slate-100 rounded-lg animate-pulse" />
          ) : user && profile ? (
            // Logged in: Show user dropdown
            <UserDropdown profile={profile} onSignOut={signOut} />
          ) : (
            // Logged out: Show login button
            <Button
              variant="ghost"
              size="sm"
              onClick={signInWithGoogle}
              className="text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
            >
              <LogIn className="h-4 w-4 mr-1" />
              로그인
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            disabled
            title="3단계 구현 예정"
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
