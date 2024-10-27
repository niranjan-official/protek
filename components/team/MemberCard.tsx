"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Member } from "@/types";

const MemberCard = ({ memberId }: { memberId: string }) => {
  const [memberData, setMemberData] = useState<Member>();
  const supabase = createClient();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", memberId)
      .single();
    if (error) {
      console.log(error.message);
    } else {
      console.log(data);
      setMemberData(data);
    }
  };

  if (!memberData) {
    return (
      <div className="p-3">
        <Skeleton className="h-[35px] w-full rounded-full" />
      </div>
    );
  } else {
    return (
      <div className="rounded-xl bg-rose-200 shadow p-3">
        <div className="flex flex-col">
          <span className="text-lg capitalize">{memberData?.name}</span>
          <span className="text-sm">{memberData?.email}</span>
          <span className="text-sm">{memberData?.phno}</span>
          <div className="flex gap-5">
          <span className="mt-2 uppercase w-fit rounded-xl bg-pink-700 font-semibold p-1 px-4 text-white">
            {memberData?.dept}
          </span>
          <span className="mt-2 uppercase w-fit rounded-xl bg-pink-700 font-semibold p-1 px-4 text-white">
            Year: {memberData?.year}
          </span>
          </div>
        </div>
      </div>
    );
  }
};

export default MemberCard;
