import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FavoriteListing {
  id: number;
  title: string;
  description: string;
  images: string[];
  category: string;
  username: string;
}

const mockFavorites: FavoriteListing[] = [
  {
    id: 2,
    title: 'Магический артефакт',
    description: 'Увеличивает ману на 50%, редкая находка',
    images: ['/placeholder.svg'],
    category: 'Артефакты',
    username: 'MagicUser',
  },
];

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoriteListing[]>(mockFavorites);

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">GameTrade</h1>
            <Button variant="outline" onClick={() => navigate('/')}>Назад</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold mb-2">Избранное</h2>
          <p className="text-muted-foreground text-lg">
            Сохранённые объявления ({favorites.length})
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((listing, index) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-video bg-muted">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFavorite(listing.id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                  >
                    <Icon name="Heart" size={20} className="fill-primary text-primary" />
                  </button>
                  <Badge className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-foreground border-0">
                    {listing.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{listing.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="User" size={16} />
                      <span>{listing.username}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Написать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="Heart" size={48} className="text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Пока нет избранных объявлений</h3>
            <p className="text-muted-foreground mb-6">
              Добавляйте понравившиеся предметы, нажимая на ❤️
            </p>
            <Button>
              <Icon name="Search" size={18} className="mr-2" />
              Посмотреть объявления
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}