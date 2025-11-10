import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Rules() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">GameTrade</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold mb-2">Правила площадки</h2>
          <p className="text-muted-foreground text-lg">
            Ознакомьтесь с правилами для безопасного обмена
          </p>
        </div>

        <div className="space-y-6">
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                Безопасность обмена
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Проверяйте репутацию пользователя перед обменом</p>
              <p>• Используйте только безопасные способы передачи предметов</p>
              <p>• Не передавайте личные данные третьим лицам</p>
              <p>• При возникновении спорных ситуаций обращайтесь в поддержку</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
                Требования к объявлениям
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Используйте реальные фотографии предметов</p>
              <p>• Указывайте точные характеристики и описание</p>
              <p>• Запрещено размещать дубликаты объявлений</p>
              <p>• Максимум 10 фотографий на одно объявление</p>
              <p>• Название должно соответствовать содержимому</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Ban" size={24} className="text-primary" />
                </div>
                Запрещено
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Размещение запрещённого контента</p>
              <p>• Обман и мошенничество при обмене</p>
              <p>• Оскорбления и неуважительное общение</p>
              <p>• Продажа предметов за реальные деньги</p>
              <p>• Использование читов и эксплойтов</p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle>Часто задаваемые вопросы</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Как создать объявление?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Зарегистрируйтесь на платформе, подтвердите email и нажмите кнопку "Создать объявление". 
                    Заполните все поля, загрузите фотографии и опубликуйте.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Как связаться с продавцом?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Нажмите кнопку "Написать" на карточке объявления. Вы сможете обсудить детали 
                    обмена через встроенный чат платформы.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Что делать при мошенничестве?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Немедленно свяжитесь с администрацией через форму поддержки. Предоставьте все 
                    доказательства нарушения. Мы рассмотрим вашу жалобу в течение 24 часов.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Можно ли изменить объявление после публикации?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Да, в личном кабинете в разделе "Мои объявления" вы можете редактировать 
                    описание, фотографии и другие параметры в любое время.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
