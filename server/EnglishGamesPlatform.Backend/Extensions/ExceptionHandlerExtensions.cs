using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace EnglishGamesPlatform.Backend.Extensions
{
    public static class ExceptionHandlerExtensions
    {
        public static void UseCustomExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                    if (exceptionHandlerPathFeature != null)
                    {
                        var errorResponse = new
                        {
                            IsSuccess = false,
                            StatusCode = 500,
                            Message = "Internal server error",
                            Details = exceptionHandlerPathFeature.Error.Message
                        };
                        await context.Response.WriteAsJsonAsync(errorResponse);
                    }
                });
            });
        }
    }

}
