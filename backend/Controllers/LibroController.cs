using Microsoft.AspNetCore.Mvc;
using Biblio.models;
using Biblio.Services;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using Serilog;
using Mysqlx.Crud;
using Microsoft.AspNetCore.Authorization;
namespace Biblio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibroController : ControllerBase
    {
        private readonly ILogger<LibroController> _logger;
        private readonly ILoggerFactory _loggerFactory;
        private readonly ILibroService _libroService;
        
        public LibroController(ILogger<LibroController> logger ,ILibroService libroService)
        {
            _logger = logger;
            
            
            _libroService =libroService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Libro>>> GetAllLibros([FromHeader(Name = "ISBN")] string ISBN = "", 
                                                                [FromHeader(Name = "Title")] string Title = "",
                                                                [FromHeader(Name = "Genero")] string Genero = "",
                                                                [FromHeader(Name = "minPaginas")] int minPaginas = 0,
                                                                [FromHeader(Name = "maxPaginas")] int maxPaginas = 0,
                                                                [FromHeader(Name = "minPrecio")] double minPrecio = 0,
                                                                [FromHeader(Name = "maxPrecio")] double maxPrecio = 0,
                                                                [FromHeader(Name = "minFecha")] DateTime minFecha = new DateTime(),
                                                                [FromHeader(Name = "maxFecha")] DateTime maxFecha = new DateTime(),
                                                                [FromHeader(Name = "Cantidad")] int Cantidad = 20,
                                                                [FromHeader(Name = "OrderAsc")] bool OrderAsc = true)
        {
            List<Libro> lstLibros = await _libroService.GetLibrosAsync(ISBN, Title, Genero, minPaginas, maxPaginas, minPrecio, maxPrecio, minFecha, maxFecha, Cantidad, OrderAsc);
            return Ok(lstLibros);
        }
        [HttpPost]
        [Authorize(Roles="admin")]
        public async Task<ActionResult<bool>> PostLibroAsync([FromBody]Libro libro)
        {
            bool bRet = await _libroService.PostLibroAsync(libro);
            return Ok(bRet);
        }
        [HttpPut]
        public async Task<ActionResult<bool>> PutLibroAsync([FromBody]Libro libro)
        {
            bool bRet = await _libroService.PutLibroAsync(libro);
            return Ok(bRet);
        }

        /// <summary>
        /// Borrara el libro que se indique, tiene que ser el ISBN exacto, sino fallara
        /// </summary>
        /// <param name="ISBN">Es necesario para poder borrarlo</param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<ActionResult<bool>> DeleteLibroAsync([FromHeader(Name = "ISBN")][Required] string ISBN)
        {
            bool bRet =await _libroService.DeleteLibroAsync(ISBN);
            return Ok(bRet);
        }
    }
}