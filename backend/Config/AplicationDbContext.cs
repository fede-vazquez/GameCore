﻿using Microsoft.EntityFrameworkCore;
using GameCore.Models.User;
using GameCore.Models.Rol;
using GameCore.Models.Game;
using GameCore.Models.Developer;
using GameCore.Models.Achievement;
using GameCore.Models.AchievementUser;
using GameCore.Models.Genre;
using GameCore.Models.Discount;
using GameCore.Models.Percentege;
using GameCore.Models.GameUser;
using GameCore.Models.Order;
using GameCore.Models.PaymentMethod;

using static GameCore.Enums.ROLE;
using static GameCore.Enums.PAYMENT_METHOD;
using static GameCore.Enums.PERCENTAGE;


namespace GameCore.Config
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Rol> Rols { get; set; } = null!;
        public DbSet<Game> Games { get; set; } = null!;
        public DbSet<Developer> Developers { get; set; } = null!;
        public DbSet<Achievement> Achievements { get; set; } = null!;
        public DbSet<AchievementUser> AchievementUsers { get; set; } = null!;
        public DbSet<Genre> Genres { get; set; } = null!;
        public DbSet<Discount> Discounts { get; set; } = null!;
        public DbSet<Percentage> Percentages { get; set; } = null!;
        public DbSet<GameUser> GameUsers { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<PaymentMethod> PaymentMethods { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //el campo de username de User debe ser unico, no nulo y tener max de 16 caracteres
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .HasMaxLength(16)
                .IsRequired();
            //el campo de email de User debe ser unico y no nulo
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();
            // la contraseña debe tener un maximo de 32 caracteres y no ser nula
            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .HasMaxLength(32)
                .IsRequired();

            //------------------------------------
            //El nombre de Rol debe ser unico, no nulo y tener un maximo de 32 caracteres
            modelBuilder.Entity<Rol>()
                .HasIndex(r => r.Name)
                .IsUnique();
            modelBuilder.Entity<Rol>()
                .Property(r => r.Name)
                .HasMaxLength(32)
                .IsRequired();
            //------------------------------------
            // El titulo del juego debe ser unico, no nulo y tener un maximo de 100 caracteres
            modelBuilder.Entity<Game>()
                .HasIndex(g => g.Title)
                .IsUnique();
            modelBuilder.Entity<Game>()
                .Property(g => g.Title)
                .HasMaxLength(100)
                .IsRequired();
            // la descripcion del juego debe tener un maximo de 500 caracteres
            modelBuilder.Entity<Game>()
                .Property(g => g.Description)
                .HasMaxLength(500);
            // el precio debe ser no nulo
            modelBuilder.Entity<Game>()
                .Property(g => g.Price)
                .HasPrecision(10, 2)
                .IsRequired();
            //------------------------------------
            // el nombre del genero debe ser unico, no nulo y tener un maximo de 50 caracteres
            modelBuilder.Entity<Genre>()
                .HasIndex(g => g.Name)
                .IsUnique();
            modelBuilder.Entity<Genre>()
                .Property(g => g.Name)
                .HasMaxLength(50)
                .IsRequired();
            //------------------------------------
            // el nombre del desarrollador debe ser unico, no nulo y tener un maximo de 100 caracteres
            modelBuilder.Entity<Developer>()
                .HasIndex(d => d.Name)
                .IsUnique();
            modelBuilder.Entity<Developer>()
                .Property(d => d.Name)
                .HasMaxLength(100)
                .IsRequired();
            //------------------------------------
            // el nombre del Achievement debe ser unico y no nulo 
            modelBuilder.Entity<Achievement>()
                .HasIndex(a => a.Name)
                .IsUnique();
            modelBuilder.Entity<Achievement>()
                .Property(a => a.Name)
                .IsRequired();
            // ------------------------------------
            // La EndDate del Discount debe ser mayor a la StartDate y debe ser no nula
            modelBuilder.Entity<Discount>()
                .HasCheckConstraint("CK_Discount_EndDate_GreaterThan_StartDate", "[EndDate] > [StartDate]");
            modelBuilder.Entity<Discount>()
                .Property(d => d.EndDate)
                .IsRequired();

            //------------------------------------
            // El valor de paymentMethodId de Order debe ser no nulo
            modelBuilder.Entity<Order>()
                .Property(o => o.PaymentMethodId)
                .IsRequired();
            //el BasePrice de Order debe ser no nulo
            modelBuilder.Entity<Order>()
                .Property(o => o.BasePrice)
                .IsRequired();
            //------------------------------------
            //EL nombre de PaymentMethod debe ser unico, no nulo y tener un maximo de 32 caracteres
            modelBuilder.Entity<PaymentMethod>()
                .HasIndex(p => p.Name)
                .IsUnique();
            modelBuilder.Entity<PaymentMethod>()
                .Property(p => p.Name)
                .HasMaxLength(32)
                .IsRequired();
            //------------------------------------
            //------------------------------------
            //Seed a Rol con enum ROLE
            modelBuilder.Entity<Rol>().HasData(
                new Rol { Id = 1, Name = GUEST },
                new Rol { Id = 2, Name = USER },
                new Rol { Id = 3, Name = ADMIN }
            );
            //Seed un PaymentMethod con enum PAYMENTMETHOD
            modelBuilder.Entity<PaymentMethod>().HasData(
                new PaymentMethod { Id = 1, Name = CREDIT_CARD },
                new PaymentMethod { Id = 2, Name = BANK_TRANSFER }
            );
            //Seed un Percentage con enum PERCENTAGE
            modelBuilder.Entity<Percentage>().HasData(
                new Percentage { Id = 1, Value = TEN },
                new Percentage { Id = 2, Value = TWENTY },
                new Percentage { Id = 3, Value = THIRTY },
                new Percentage { Id = 4, Value = FORTY },
                new Percentage { Id = 5, Value = FIFTY }
            );
            //------------------------------------
            //-----------------------------------
            //establecer clave foranea compuesta para achievementUser
            modelBuilder.Entity<AchievementUser>()
                .HasKey(au => new { au.AchievementId, au.UserId });
            //establecer clave foranea compuesta para GameUser
            modelBuilder.Entity<GameUser>()
                .HasKey(gu => new { gu.GameId, gu.UserId });

        }

    }
}
