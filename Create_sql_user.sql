-- see: https://blogs.msdn.microsoft.com/sqlexpress/2011/12/08/using-localdb-with-full-iis-part-2-instance-ownership/
-- create a user for SQL Express
create login [IIS APPPOOL\a2spa] from windows;
exec sp_addsrvrolemember N'IIS APPPOOL\a2spa', sysadmin