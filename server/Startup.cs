using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace server
{
  public class Startup
  {
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddPolicy("dev", builder =>
        {
          builder.AllowAnyHeader();
          builder.AllowAnyMethod();
          builder.AllowAnyOrigin();
        });
      });
    }

    private Random _random = new Random();
    private int _total = 1000000;
    private string[] cityList = new string[] { "İstanbul", "Ankara", "İzmir", "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak" };

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors("dev");

      app.Map("/recent-sales", builder =>
      {
        builder.Run(async context =>
        {
          this._total += _random.Next(100, 500);

          var model = new {
            sales = Enumerable.Range(1, 10).Select(e => new
            {
              cityCode = _random.Next(1, 82),
              productName = $"Urun {e}",
              quantity = _random.Next(1, 100)
            }),
            total = _total
          };

          await context.Response.WriteAsJsonAsync(model);
        });
      });

      app.Map("/city-sales", builder =>
      {
        builder.Run(async context =>
        {
          var model = cityList.Select(e => new { cityName = e, quantity = _random.Next(1, 1000) });

          await context.Response.WriteAsJsonAsync(model);
        });
      });
    }
  }
}
