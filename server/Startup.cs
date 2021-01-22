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

    private Random random = new Random();

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseCors("dev");

      app.Map("", builder =>
      {
        builder.Run(async context =>
        {
          var model = Enumerable.Range(1, 10).Select(e => new
          {
            cityCode = random.Next(1, 82),
            productName = $"Urun {e}",
            quantity = random.Next(1, 100)
          });

          await context.Response.WriteAsJsonAsync(model);
        });
      });
    }
  }
}
