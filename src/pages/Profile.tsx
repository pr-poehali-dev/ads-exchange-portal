import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface UserListing {
  id: number;
  title: string;
  description: string;
  images: string[];
  category: string;
  status: 'active' | 'closed';
  views: number;
}

const mockUserListings: UserListing[] = [
  {
    id: 1,
    title: 'Легендарный меч',
    description: 'Редкий меч с высоким уроном',
    images: ['/placeholder.svg'],
    category: 'Оружие',
    status: 'active',
    views: 45,
  },
  {
    id: 2,
    title: 'Магический артефакт',
    description: 'Увеличивает ману на 50%',
    images: ['/placeholder.svg'],
    category: 'Артефакты',
    status: 'closed',
    views: 23,
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const [listings] = useState<UserListing[]>(mockUserListings);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">GameTrade</h1>
            <Button variant="outline" onClick={() => navigate('/')}>Выйти</Button>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 animate-fade-in">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
              GM
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1">GameMaster</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <Icon name="Mail" size={16} />
                gamemaster@example.com
              </p>
              <div className="flex gap-4 mt-3">
                <div className="text-sm">
                  <span className="font-semibold">12</span>{' '}
                  <span className="text-muted-foreground">объявлений</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold">345</span>{' '}
                  <span className="text-muted-foreground">просмотров</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="active" className="animate-fade-in">
          <TabsList className="mb-6">
            <TabsTrigger value="active" className="gap-2">
              <Icon name="Package" size={16} />
              Активные
            </TabsTrigger>
            <TabsTrigger value="closed" className="gap-2">
              <Icon name="Archive" size={16} />
              Закрытые
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {listings
              .filter(l => l.status === 'active')
              .map(listing => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex gap-4 p-4">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                            <Badge variant="outline">{listing.category}</Badge>
                          </div>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Активно
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{listing.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Eye" size={16} />
                            {listing.views}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          <Icon name="Edit" size={16} className="mr-1" />
                          Изменить
                        </Button>
                        <Button size="sm" variant="outline">
                          <Icon name="Trash2" size={16} className="mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {listings
              .filter(l => l.status === 'closed')
              .map(listing => (
                <Card key={listing.id} className="overflow-hidden opacity-75">
                  <CardContent className="p-0">
                    <div className="flex gap-4 p-4">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-32 h-32 object-cover rounded-lg grayscale"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                            <Badge variant="outline">{listing.category}</Badge>
                          </div>
                          <Badge variant="secondary">Закрыто</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{listing.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Eye" size={16} />
                            {listing.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}