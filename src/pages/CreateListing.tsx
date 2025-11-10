import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

export default function CreateListing() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Создание объявления:', { ...formData, images });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">GameTrade</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Создать объявление</h2>
          <p className="text-muted-foreground">Заполните информацию о вашем предмете</p>
        </div>

        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Информация о предмете</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Название предмета</Label>
                <Input
                  id="title"
                  placeholder="Например: Легендарный меч огня"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weapon">Оружие</SelectItem>
                    <SelectItem value="armor">Броня</SelectItem>
                    <SelectItem value="artifact">Артефакты</SelectItem>
                    <SelectItem value="consumable">Расходники</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  placeholder="Подробно опишите характеристики предмета, его редкость, бонусы и особенности..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Чем подробнее описание, тем больше вероятность успешного обмена
                </p>
              </div>

              <div className="space-y-2">
                <Label>Фотографии (до 10 шт.)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square group">
                      <img
                        src={image}
                        alt={`Фото ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 10 && (
                    <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-secondary/50 transition-colors">
                      <Icon name="Plus" size={32} className="text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Добавить фото</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Загружено {images.length} из 10 фотографий
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" size="lg" className="flex-1 font-semibold">
                  <Icon name="Send" size={18} className="mr-2" />
                  Опубликовать объявление
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Отменить
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}