# آزمایشگاه مهندسی نرم افزار

## شرح آزمایش
در این آزمایش قصد داریم یک سیستم میکروسرویس طراحی کنیم که اجزای مختلف آن به صورت مجزا روی داکر بالا بیایند و هر سیستم به صورت مستقل بالا باشد و سپس اجزا بتوانند با هم ارتباط برقرار کنند.

برای این کار ما یک سرویس دیتابیس MySQL را روی داکر بالا آوردیم. برای این کار یه image از MySQL از داکر pull کردیم و در پروژه از آن استفاده کردیم.

این سیستم یک سرویس منطق دارد که عملیات های روی دیتابیس را هندل میکند مثل ساخت جدول روی دیتابیس، ساخت یک آبجکت، خواندن آبجکت، خواندن همه آبجکت‌ها، حذف آبجکت، آپدیت آبجکت (CRUD).

همچنین برای این سیستم یک سرویس load balancing نوشتیم که با استفاده از nginx.conf ارتباطات این سرویس‌ها را با هم آسان تر میکند.

برای اینکه هر کدام از سرویس‌ها را به صورت مجزا بالا بیارویم نیاز به داکر داریم.

## نصب داکر

داکر را دانلود و روی سیستم نصب میکنیم.
پس از دانلود و نصب داکر داخل آن لاگین کردیم و تصویر داکر دسکتاپ آن به شکل زیر است. 


![image10](https://github.com/sarazm2000/Microservice/assets/59636948/1e820ab6-307f-47e6-b980-ff99a226cb88)

همچنین برای بررسی ورژن داکر و اطمینان از نصب دستور زیر را در ترمینال اجرا کردیم.

`
docker -v
`

<center>
<img width="682" alt="image16" src="https://github.com/sarazm2000/Microservice/assets/59636948/6fc8bf5a-1646-487b-8ff9-3ea7bb264583">
</center>

برای این پروژه از پایگاه داده‌ی MySQL استفاده میکنیم. از دستور زیر برای pull کردن image آن استفاده میکنیم.

`
docker pull mysql
`

## ساختار پروژه
در این آزمایش ما یک سرویس دیتابیس داریم که یک داکرفایل و یک فایل package.json در آن وجود دارد. یک سرویس منطق داریم که عملیات های مربوط به دیتابیس را بر عهده میگیرد و با دیتابیس در ارتباط است. و یک سرویس load balancer داریم که ترافیک را مدیریت میکند. منظور آن است که ارتباط بین سرویس های مختلف را مدیریت میکند.


<img width="323" alt="image1" src="https://github.com/sarazm2000/Microservice/assets/59636948/a50d6308-16a6-4fac-8c86-c3d5b1c42bec">

در زیر داکر فایل ها و فایل nginx را مشاهده میکنید.

## داکرفایل سیستم دیتابیس:

<img width="867" alt="image2" src="https://github.com/sarazm2000/Microservice/assets/59636948/26d10986-b2b7-444f-999d-861fce6c296c">

## داکرفایل سرویس منطق:


<img width="740" alt="image5" src="https://github.com/sarazm2000/Microservice/assets/59636948/df6396b0-4c5a-434b-bebb-619e482ac12a">

## Nginx.conf:

<img width="866" alt="image13" src="https://github.com/sarazm2000/Microservice/assets/59636948/85f1ea39-915f-439c-a84d-55211d0ed8ab">

## UML:

<img width="437" alt="image17" src="https://github.com/sarazm2000/Microservice/assets/59636948/327170d3-aa4b-4c72-b0e2-13a770d313a1">


 ما برای راحتی کار یک فایل docker-compose نوشتیم تا داکرفایل هر سرویس را ران کند و 
کارمان آسان تر شود. از دستور زیر برای اجرای docker-compose استفاده کردیم.


`
docker-compose up --build
`

در تصویر زیر میبینیم که همه داکرفایل ها بیلد شده اند. توجه داشته باشید که در انتها باید پیغام Connected to MySQL database را مشاهده کنید. اگر در خط آخر این پیغام را مشاهده نکردید باید دستور بالا را یکبار دیگر اجرا کنید و اگر باز هم نشد داکر را ری استارت کرده و مجددا دستور بالا را اجرا کنید.

![image15](https://github.com/sarazm2000/Microservice/assets/59636948/b97e4308-9c43-4366-b3aa-0726b05bdbbd)

با مشاهده پیغام Connected to MySQL database برنامه در حال اجرا است و میتوانیم از سرویس استفاده کنیم.
## تست کارکردن API ها:

در ادامه با استفاده از postman همه‌ی APIها را تست کردیم و خروجی را در تصاویر مشاهده میکنید.

### ساختن جدول در دیتابیس:

![image14](https://github.com/sarazm2000/Microservice/assets/59636948/fb02584b-7f5f-4ae5-8db6-e7cce1d9b092)

![image18](https://github.com/sarazm2000/Microservice/assets/59636948/e60fedc1-e72c-42fd-97da-217c2f14043b)

### اضافه کردن todo


![image6](https://github.com/sarazm2000/Microservice/assets/59636948/85aa875a-1cab-4463-b55b-a748308b11ef)


### خواندن همه‌ی todo ها


![image8](https://github.com/sarazm2000/Microservice/assets/59636948/46ea3e8b-249d-4380-8f2e-22444bb2eaca)


### خواندن یک todo:

![image3](https://github.com/sarazm2000/Microservice/assets/59636948/4abb1eeb-8588-4066-9a62-d50b98324570)



 ### آپدیت کردن todo:


 ![image3](https://github.com/sarazm2000/Microservice/assets/59636948/a07709fe-0de1-419a-8cb0-ec962ccb728e)


![image8](https://github.com/sarazm2000/Microservice/assets/59636948/02849fd6-59c0-4c30-a9c4-d03b0164a371)


### حذف todo:



![image4](https://github.com/sarazm2000/Microservice/assets/59636948/a2c4cc08-cfea-4e35-a6c3-dc2128413d31)


![image12](https://github.com/sarazm2000/Microservice/assets/59636948/28e63471-09b8-4133-93ee-01e7df773810)


## اجرای دستورات گفته شده:

دستورات زیر را اجرا میکنیم:

`
docker ps
`

`
docker image ls
`


![image7](https://github.com/sarazm2000/Microservice/assets/59636948/be88352d-36f8-453f-b377-4cc388f53ec0)



## پرسش‌ها:



۱- UML Component Diagram
در این نمودار ما تلاش داریم تا اجزای سیستم را نشان دهیم. این نمودار ترکیب‌های اجزا، و وابستگی‌ها و تعاملاتشان با هم را به تصویر میکشد.

۲- طراحی مبتنی بر دامنه یا Domain-Driven Design (DDD) یک متدولوژی طراحی نرم‌افزاری است که بر اساس مفهوم‌های دامنه کسب‌وکار تمرکز دارد و تلاش می‌کند تا مدلی عمیق و بازنمایی دقیق از دامنه کسب‌وکار ایجاد کند. این مفهوم‌ها به عنوان "زبان مشترک" میان توسعه‌دهندگان و فرهنگ سازمانی کاربرد دارند و به ساختاردهی بهتر و تفاهم بهتر در مورد سیستم کمک می‌کنند.
در معماری میکروسرویس، DDD نقش مهمی ایفا می‌کند. زیرا میکروسرویس‌ها به اندازه یک میکروسرویس باید بازنمایی دامنه کسب‌وکار را ایجاد کنند. هر میکروسرویس به عنوان یک حدود محدود در دامنه مشخصی شناخته می‌شود و دارای مدل دامنه‌ای است که به تفصیل نشان‌دهنده مفاهیم، انتزاعات و روابط آن دامنه است.
DDD در معماری میکروسرویس تضمین می‌کند که هر میکروسرویس با توجه به مفاهیم دامنه‌ای که خدمت می‌دهد، طراحی و پیاده‌سازی می‌شود. این امر منجر به جداسازی منطق کسب‌وکار به واحدهای جداگانه (میکروسرویس‌ها) می‌شود که به توسعه، نگهداری و مدیریت آن‌ها کمک می‌کند.

۳-  خیر، داکر کامپوز ابزاری برای تعریف و مدیریت چند سرویس مرتبط است که در محیط داکر قرار دارد و میتوان با استفاده از آن یک فایلی را تنظیم کنیم که تعدادی کانتینر در آن محیط به صوت مشترک و در محیط یکسان ایجاد کنیم. این موضوع به خصوص در طراحی سیستم‌های میکروسرویس کاربرد دارد که میتوان چند سرویس را بر روی یک سیستم لوکال ایجاد و اجرا کنیم.
اما ابزارهای Orchestration مانند Kubernetes به مدیریت و اجرای برنامه‌ها و سرویس‌ها در محیط‌های توزیع‌شده متمرکز می‌شوند. آن‌ها از مفاهیمی مانند مدیریت مقیاس، مداومت، توازن بار و مدیریت lifecycle سرویس‌ها پشتیبانی می‌کنند.
یعنی Docker Compose ابزاری برای مدیریت چندین سرویس در یک محیط Docker تنها است، در حالی که ابزارهای Orchestration مانند Kubernetes برای مدیریت جامع و پیچیده‌تر سرویس‌ها در محیط‌های توزیع‌شده و مقیاس‌پذیری بالا طراحی شده‌اند.






