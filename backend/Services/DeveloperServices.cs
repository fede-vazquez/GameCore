using AutoMapper;
using GameCore.Models.Developer;
using GameCore.Models.Developer.DTO;
using GameCore.Repositories;
using GameCore.Utils;

namespace GameCore.Services
{
    public class DeveloperServices
    {
        private readonly IDeveloperRepository _developerRepository;
        private readonly IMapper _mapper;

        public DeveloperServices(IDeveloperRepository developerRepository, IMapper mapper)
        {
            _developerRepository = developerRepository;
            _mapper = mapper;
        }

        public async Task<List<Developer>> GetAllAsync()
        {
            var developers = await _developerRepository.GetAllAsync();
            if(developers == null)
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.NotFound, "Developers not found");
            }
            return _mapper.Map<List<Developer>>(developers);
        }

        public async Task<CreateDeveloperResponseDTO> CreateAsync(CreateDeveloperDTO developerDTO)
        {
            if (string.IsNullOrEmpty(developerDTO.Name))
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.BadRequest, "Developer name is required");
            }

            var existingDeveloper = await _developerRepository.GetOneAsync(d => d.Name.ToLower() == developerDTO.Name.ToLower());
            if (existingDeveloper != null)
            {
                throw new HttpResponseError(System.Net.HttpStatusCode.BadRequest, $"A developer with the name {developerDTO.Name} already exists");
            }

            var developer = _mapper.Map<Developer>(developerDTO);
            await _developerRepository.CreateOneAsync(developer);

            return _mapper.Map<CreateDeveloperResponseDTO>(developer);
        }
    }
}
