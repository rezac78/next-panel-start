"use server";
// import { handleApiError } from '@/lib/handle-api-error';
import { privateApiRequest } from "@/apis/private";
import { BASE_URL } from "@/config";
// import { extractToken } from "@/lib/session";
// import { cookies } from "next/headers";
// import axios from "axios";

export async function getDashboard(start?: string, end?: string) {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    let url = `${BASE_URL}admin/dashboard`;
    if (start) {
      url += `?start=${start}`;
    }
    if (end) {
      url += `&end=${end}`;
    }

    // const cookie = (await cookies()).get("session")?.value;
    // const token = await extractToken(cookie);
    // const res = await axios.get(url,{
    //   headers:{
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // console.log('**************')
    // console.log(res)
    // console.log('**************')

    return await privateApiRequest(url, {
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    });

    // const res = await api.get<AdminDashboardResponse>(
    //   `admin/dashboard?start=${startDate}&end=${endDate}`,
    //   {
    //     headers: { Authorization: `Bearer ${Token}` },
    //   }
    // );
  } catch (err: any) {
    // await handleApiError(err, '❌ Error loading dashboard data');
    console.error("❌ Error loading dashboard data", err);
    
return null;
  }
}
export async function getDashboardProduct(type: string, start: string) {
  try {
    // const res = await api.get<DashboardProductsResponse>(
    //   `admin/dashboard/get-products?start=${start}&type=${type}`,
    //   {
    //     headers: { Authorization: `Bearer ${Token}` },
    //   }
    // );
    return await privateApiRequest(
      `${BASE_URL}admin/dashboard/get-products?start=${start}&type=${type}`
    );
  } catch (err: any) {
    // await handleApiError(err, '❌ Error fetching dashboard products');
    return null;
  }
}
