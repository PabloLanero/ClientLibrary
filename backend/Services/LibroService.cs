using Biblio.models;
using Biblio.Repositories;

namespace Biblio.Services
{
    public class LibroService : ILibroService
    {
        private readonly ILibroRepository _libroRepository;
        public LibroService(ILibroRepository p_libroRepository)
        {
            _libroRepository = p_libroRepository;
        }

        public async Task<List<Libro>> GetLibrosAsync(string ISBN, string Title, string Genero, int minPaginas, int maxPaginas, double minPrecio, double maxPrecio, DateTime minFecha, DateTime maxFecha, int cantidad, bool OrderAsc)
        {
            List<Libro> libros = await _libroRepository.GetLibrosAsync(OrderAsc);
            
            //Filtramos por ISBN
            if(!string.IsNullOrEmpty(ISBN)) libros = libros.FindAll(libro => libro.ISBN.Contains(ISBN));
            
            //Filtramos por titulo
            if(!string.IsNullOrEmpty(Title)) libros = libros.FindAll(libro => libro.Titulo.Contains(Title));

            // Filtramos por genero
            if(!string.IsNullOrEmpty(Genero)) libros = libros.FindAll(libro => libro.Genero.Contains(Genero));

            // Filtramos por rango de paginas
            if(minPaginas > 0) libros = libros.FindAll(libro => libro.NumeroPaginas >= minPaginas);
            if(maxPaginas > 0) libros = libros.FindAll(libro => libro.NumeroPaginas <= maxPaginas);
            
            // Filtramos por rango de precio
            if(minPrecio > 0) libros = libros.FindAll(libro => libro.Precio >= minPrecio);
            if(maxPrecio > 0) libros = libros.FindAll(libro => libro.Precio <= maxPrecio);
            
            // Filtramos por rango de fecha
            if(minFecha != DateTime.MinValue) libros = libros.FindAll(libro => libro.FechaPublicacion >= minFecha);
            if(maxFecha != DateTime.MinValue) libros = libros.FindAll(libro => libro.FechaPublicacion <= maxFecha);
            
            // Limitamos la cantidad de resultados
            int count = Math.Min(cantidad, libros.Count);
            return libros.GetRange(0, count);
        }
        
        public async Task<Libro> GetOneLibroAsync(string ISBN)
        {
            Libro libro = await _libroRepository.GetOneLibroAsync(ISBN);
            return libro;
        }
        public async Task<bool> PostLibroAsync(Libro libro)
        {
            bool bRet = await _libroRepository.PostLibroAsync(libro);
            return bRet;
        }
        public async Task<bool> PutLibroAsync(Libro libro)
        {
            bool bRet = await _libroRepository.PutLibroAsync(libro);
            return bRet;
        }

        public async Task<bool> DeleteLibroAsync(string ISBNLibro)
        {
            bool bRet = await _libroRepository.DeleteLibroAsync(ISBNLibro);
            return bRet;
        }

        
    }
}