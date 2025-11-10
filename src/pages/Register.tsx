import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.username.length < 3) {
      newErrors.username = 'Логин должен быть не менее 3 символов';
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Логин может содержать только буквы, цифры и _';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен быть не менее 8 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Регистрация:', formData);
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Icon name="UserPlus" size={32} className="text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl">Регистрация</CardTitle>
          <CardDescription>Создайте аккаунт для размещения объявлений</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <div className="relative">
                <Icon name="User" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="username"
                  placeholder="Придумайте уникальный логин"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={`pl-10 ${errors.username ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Icon name="Mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.email}
                </p>
              )}
              <p className="text-xs text-muted-foreground">На этот email придёт письмо с подтверждением</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Icon name="Lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Минимум 8 символов"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <div className="relative">
                <Icon name="Lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`pl-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full font-semibold" size="lg">
              Зарегистрироваться
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{' '}
              <a href="#" className="text-primary font-medium hover:underline">
                Войти
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}