import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Listing {
  id: number;
  title: string;
  description: string;
  images: string[];
  category: string;
  username: string;
  isFavorite: boolean;
}

const mockListings: Listing[] = [
  {
    id: 1,
    title: 'Легендарный меч',
    description: 'Редкий меч с высоким уроном, подходит для PvP',
    images: ['/placeholder.svg'],
    category: 'Оружие',
    username: 'GameMaster',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Магический артефакт',
    description: 'Увеличивает ману на 50%, редкая находка',
    images: ['/placeholder.svg'],
    category: 'Артефакты',
    username: 'MagicUser',
    isFavorite: false,
  },
  {
    id: 3,
    title: 'Эпический щит',
    description: 'Защита +200, редкость: эпический',
    images: ['/placeholder.svg'],
    category: 'Броня',
    username: 'Guardian',
    isFavorite: false,
  },
];

export default function Listings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Оружие', 'Броня', 'Артефакты', 'Расходники'];

  const toggleFavorite = (id: number) => {
    setListings(prev =>
      prev.map(listing =>
        listing.id === id ? { ...listing, isFavorite: !listing.isFavorite } : listing
      )
    );
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">GameTrade</h1>
            <nav className="flex gap-6">
              <button onClick={() => navigate('/')} className="text-foreground hover:text-primary transition-colors font-medium">
                Объявления
              </button>
              <button onClick={() => navigate('/favorites')} className="text-muted-foreground hover:text-primary transition-colors">
                Избранное
              </button>
              <button onClick={() => navigate('/profile')} className="text-muted-foreground hover:text-primary transition-colors">
                Профиль
              </button>
              <button onClick={() => navigate('/rules')} className="text-muted-foreground hover:text-primary transition-colors">
                Правила
              </button>
            </nav>
            <Button className="font-medium" onClick={() => navigate('/register')}>Войти</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold mb-2">Обмен игровыми предметами</h2>
          <p className="text-muted-foreground text-lg">Найди нужный предмет или размести своё объявление</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
          <div className="flex-1 relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск предметов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button size="lg" className="font-medium" onClick={() => navigate('/create')}>
            <Icon name="Plus" size={20} className="mr-2" />
            Создать объявление
          </Button>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 animate-fade-in">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 text-sm font-medium whitespace-nowrap transition-all hover:scale-105"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => (
            <Card
              key={listing.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video bg-muted">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(listing.id);
                  }}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={listing.isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}
                  />
                </button>
                <Badge className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-foreground border-0">
                  {listing.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{listing.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="User" size={16} />
                  <span>{listing.username}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </main>

      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 GameTrade. Площадка обмена игровыми предметами</p>
        </div>
      </footer>
    </div>
  );
}