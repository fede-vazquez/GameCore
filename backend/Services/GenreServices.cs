using AutoMapper;
using GameCore.Models.Genre;
using GameCore.Models.Genre.DTO;
using GameCore.Models.Rol;
using GameCore.Repositories;
using GameCore.Utils;

namespace GameCore.Services
{
    public class GenreServices
    {
        private readonly IGenreRepository _genreRepository;
        private readonly IMapper _mapper;
        public GenreServices(IGenreRepository genreRepository, IMapper mapper)
        {
            _genreRepository = genreRepository;
            _mapper = mapper;
        }
        async public Task<Genre> GetOneByNameAsync(string name)
        {
            var genre = await _genreRepository.GetOneAsync(g => g.Name.ToLower() == name.ToLower());
            if (genre == null)
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, $"The genre {name} was not found");
            }
            return genre;
        }

        async public Task<CreateGenreResponseDTO> CreateOneAsync(CreateGenreDTO genreDTO)
        {
            if (string.IsNullOrEmpty(genreDTO.Name))
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.BadRequest, "The genre name is empty");
            }

            genreDTO.Name = genreDTO.Name.ToLower();

            var genre = _mapper.Map<Genre>(genreDTO);

            var existingGenre = await _genreRepository.GetOneAsync(g => g.Name == genre.Name);

            if (existingGenre != null)
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.BadRequest, $"The genre {genreDTO.Name} already exists");
            }
            
            await _genreRepository.CreateOneAsync(genre);

            return _mapper.Map<CreateGenreResponseDTO>(genre);
        }

        async public Task<List<Genre>> GetAllAsync()
        {
            var genres = await _genreRepository.GetAllAsync();
            
            return genres.Select(g => new Genre
            {
                Id = g.Id,
                Name = g.Name
            }).ToList();
        }
    }
}