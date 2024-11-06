import { Footer, TopMenu } from '@/components';
import TopNav from '@/components/ui/top-menu/TopNav';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen'>
      {/* <TopMenu /> */}
      <TopNav />

      <div className='px-0 sm:px-10'>{children}</div>

      <Footer />
    </main>
  );
}
