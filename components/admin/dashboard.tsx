"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, BookOpen, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12,345,678</div>
            <p className="text-xs text-muted-foreground">+20.1% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pesanan</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Produk</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+42 dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pelanggan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+18 dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Pesanan</TabsTrigger>
          <TabsTrigger value="products">Produk</TabsTrigger>
          <TabsTrigger value="customers">Pelanggan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Penjualan Bulanan</CardTitle>
              <CardDescription>Grafik penjualan dalam 6 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart className="h-16 w-16" />
                <p>Grafik penjualan akan ditampilkan di sini</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Produk Terlaris</CardTitle>
                <CardDescription>5 produk dengan penjualan tertinggi</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Filosofi Teras</span>
                    </div>
                    <span>120 terjual</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Laut Bercerita</span>
                    </div>
                    <span>98 terjual</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Atomic Habits</span>
                    </div>
                    <span>87 terjual</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Pulang</span>
                    </div>
                    <span>76 terjual</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Bumi Manusia</span>
                    </div>
                    <span>65 terjual</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pesanan Terbaru</CardTitle>
                <CardDescription>5 pesanan terbaru yang masuk</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">#ORD-12345</div>
                      <div className="text-sm text-muted-foreground">John Doe</div>
                    </div>
                    <div className="text-right">
                      <div>Rp 250,000</div>
                      <div className="text-sm text-muted-foreground">Baru</div>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">#ORD-12344</div>
                      <div className="text-sm text-muted-foreground">Jane Smith</div>
                    </div>
                    <div className="text-right">
                      <div>Rp 180,000</div>
                      <div className="text-sm text-muted-foreground">Diproses</div>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">#ORD-12343</div>
                      <div className="text-sm text-muted-foreground">Bob Johnson</div>
                    </div>
                    <div className="text-right">
                      <div>Rp 320,000</div>
                      <div className="text-sm text-muted-foreground">Dikirim</div>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">#ORD-12342</div>
                      <div className="text-sm text-muted-foreground">Alice Brown</div>
                    </div>
                    <div className="text-right">
                      <div>Rp 150,000</div>
                      <div className="text-sm text-muted-foreground">Selesai</div>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">#ORD-12341</div>
                      <div className="text-sm text-muted-foreground">Charlie Davis</div>
                    </div>
                    <div className="text-right">
                      <div>Rp 210,000</div>
                      <div className="text-sm text-muted-foreground">Selesai</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Pesanan</CardTitle>
              <CardDescription>Kelola semua pesanan dari pelanggan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Halaman Pesanan</h3>
                <p className="text-muted-foreground mb-4">Lihat dan kelola semua pesanan dari pelanggan</p>
                <Button asChild>
                  <Link href="/admin/orders">Lihat Semua Pesanan</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Produk</CardTitle>
              <CardDescription>Kelola semua produk di toko Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Halaman Produk</h3>
                <p className="text-muted-foreground mb-4">Tambah, edit, dan hapus produk di toko Anda</p>
                <Button asChild>
                  <Link href="/admin/products">Kelola Produk</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Pelanggan</CardTitle>
              <CardDescription>Lihat dan kelola semua pelanggan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Halaman Pelanggan</h3>
                <p className="text-muted-foreground mb-4">Lihat informasi dan riwayat pembelian pelanggan</p>
                <Button asChild>
                  <Link href="/admin/customers">Lihat Pelanggan</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
