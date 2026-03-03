using Biblio.models;

namespace Biblio.Services
{
    public interface ILibroService
    {
        public Task<List<Libro>> GetLibrosAsync(string ISBN, string Title, string Genero, 
        int minPaginas, int maxPaginas, double minPrecio, double maxPrecio, DateTime minFecha, DateTime maxFecha, int Cantidad , bool OrderAsc);
        public Task<Libro> GetOneLibroAsync(string Id);
        public Task<bool> PostLibroAsync(Libro libro);
        public Task<bool> PutLibroAsync(Libro libro);
        public Task<bool> DeleteLibroAsync(string ISBNLibro);
    }
}