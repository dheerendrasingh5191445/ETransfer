using Microsoft.EntityFrameworkCore;

namespace E_TransferWebApi.Models
{
    public class ETransferDbContext : DbContext
    {
        public ETransferDbContext(DbContextOptions options) : base (options)
        {

        }
         
        public DbSet<Assets> ETransferAssets { get; set; }
        public DbSet<Requests> ETransferRequests { get; set; }
    }
}
