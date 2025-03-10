// export default function BrowserExtension() {
//   return (
//     <div>
//       <h1>브라우저 확장 프로그램 페이지</h1>
//     </div>
//   )
// }

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const services = [
  "AWS",
  "Azure",
  "Google Cloud",
  "Digital Ocean",
  "Heroku",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Snowflake",
  "Mysql",
  "Auth0",
  "Okta",
  "keycloak",
  "MongoDB",
  "Github OAuth",
  "Facebook OAuth",
  "Twitter OAuth",
];

export default function BrowserExtension() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  // const handleDialogOpen = () => {
  //   setDialogOpen(true);
  // };

  useEffect(() => {
    console.log("hello");
  }, [selectedServices]);

  // setDialogOpen(true)
  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((name) => name !== serviceName)
        : [...prev, serviceName]
    );
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <Card className="p-5">
        <h2 className="text-2xl font-bold">시크릿 탐지 설정</h2>
        <p className="text-gray-600 text-sm">
          탭지 규칙은 단일 탭지기 또는 AND' 또는 'OR' 논리를 결합한 다중 탭지로
          구성될 수 있습니다.
          <br />
          탭지 규칙은 조직의 필요와 위험 허용 범위에 따라 지정할 수 있습니다.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {services.map((service, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`cursor-pointer border-gray-200 hover:bg-gray-100 ${
                selectedServices.includes(service) ? "border-black" : ""
              }`}
              onClick={() => toggleService(service)}
            >
              {service}
            </Badge>
          ))}
        </div>

        <Separator className="my-4" />

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="">
              + 탐지 규칙 설정
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>시크릿 탐지 설정</DialogTitle>
            </DialogHeader>

            <div className="flex flex-wrap gap-2">
              {selectedServices.map((service, index) => (
                <Badge key={index} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>
            {/* <DialogClose asChild>
              <button className="IconButton" aria-label="Close">
                <XIcon />
              </button>
            </DialogClose> */}
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
