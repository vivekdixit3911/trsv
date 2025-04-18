import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, MapPin, Users, Car, Clock, ChevronRight, CheckCircle, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface TaxiBookingFormProps {
  vehicleType: string;
  onPassengerCountChange: (count: string) => void;
  passengerCount: string;
}

const TaxiBookingForm: React.FC<TaxiBookingFormProps> = ({
  vehicleType,
  onPassengerCountChange,
  passengerCount
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const vehicleInfo = {
    sedan: {
      name: "Premium Sedan",
      capacity: "4 Passengers",
      features: ["Air Conditioning", "Comfortable Seating", "Music System", "GPS Navigation"],
      price: "₹15/km",
      priceValue: 15,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop",
      travelTime: "5-6 hours",
      distance: "180-220 km",
      description: "Perfect for small families or business travelers requiring comfort and elegance.",
      recommendedFor: "1-3 passengers"
    },
    suv: {
      name: "Luxury SUV",
      capacity: "6 Passengers",
      features: ["Air Conditioning", "Spacious Interior", "Premium Sound System", "Extra Luggage Space"],
      price: "₹18/km",
      priceValue: 18,
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2936&auto=format&fit=crop",
      travelTime: "5-6 hours",
      distance: "180-220 km",
      description: "Ideal for families or small groups looking for a blend of comfort and space.",
      recommendedFor: "4-6 passengers"
    },
    tempo: {
      name: "Tempo Traveller",
      capacity: "12 Passengers",
      features: ["Air Conditioning", "Reclining Seats", "Ample Luggage Space", "Perfect for Groups"],
      price: "₹22/km",
      priceValue: 22,
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2940&auto=format&fit=crop",
      travelTime: "5-6 hours",
      distance: "180-220 km",
      description: "Perfect for medium-sized groups traveling together with ample space for luggage.",
      recommendedFor: "7-12 passengers"
    },
    bus: {
      name: "Luxury Bus",
      capacity: "20+ Passengers",
      features: ["Air Conditioning", "Reclining Seats", "Entertainment System", "Large Groups"],
      price: "₹35/km",
      priceValue: 35,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2940&auto=format&fit=crop",
      travelTime: "6-7 hours",
      distance: "180-220 km",
      description: "The ultimate solution for large groups traveling together in complete comfort.",
      recommendedFor: "13+ passengers"
    }
  };

  // Calculate approximate cost based on distance
  const calculateApproxCost = () => {
    const avgDistance = 200; // average distance in km
    const vehicle = vehicleInfo[vehicleType as keyof typeof vehicleInfo];
    return `₹${(avgDistance * vehicle.priceValue).toLocaleString()}`;
  };

  const onSubmit = (data: any) => {
    console.log({ ...data, date, vehicleType });
    toast({
      title: "Booking Request Submitted",
      description: "We will contact you shortly with available taxi options.",
    });
  };

  return (
    <div className="relative">
      {/* Large Vehicle Image Background */}
      <div className="absolute -top-20 -right-20 w-72 h-72 opacity-10 transform rotate-12 hidden lg:block pointer-events-none">
        <img 
          src={vehicleInfo[vehicleType as keyof typeof vehicleInfo].image} 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* Booking Form */}
        <div className="lg:col-span-2 transform lg:-rotate-1 z-10">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pickup" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary-500" />
                  Pickup Location
                </Label>
                <Select>
                  <SelectTrigger id="pickup" className="w-full h-12">
                    <SelectValue placeholder="Select pickup point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shimla">Shimla</SelectItem>
                    <SelectItem value="manali">Manali</SelectItem>
                    <SelectItem value="dharamshala">Dharamshala</SelectItem>
                    <SelectItem value="dalhousie">Dalhousie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dropoff" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary-500" />
                  Drop Location
                </Label>
                <Select>
                  <SelectTrigger id="dropoff" className="w-full h-12">
                    <SelectValue placeholder="Select drop point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shimla">Shimla</SelectItem>
                    <SelectItem value="manali">Manali</SelectItem>
                    <SelectItem value="dharamshala">Dharamshala</SelectItem>
                    <SelectItem value="dalhousie">Dalhousie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary-500" />
                  Journey Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passengers" className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary-500" />
                  Passengers
                </Label>
                <Select value={passengerCount} onValueChange={onPassengerCountChange}>
                  <SelectTrigger id="passengers" className="w-full h-12">
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 Passengers</SelectItem>
                    <SelectItem value="4-6">4-6 Passengers</SelectItem>
                    <SelectItem value="7-12">7-12 Passengers</SelectItem>
                    <SelectItem value="13+">13+ Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carType" className="text-sm font-medium flex items-center gap-2">
                  <Car className="h-4 w-4 text-primary-500" />
                  Car Type
                </Label>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div>
                      <Select value={vehicleType} onValueChange={(value) => onPassengerCountChange(vehicleInfo[value as keyof typeof vehicleInfo].recommendedFor)}>
                        <SelectTrigger id="carType" className="w-full h-12">
                          <SelectValue placeholder="Select car type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Premium Sedan</SelectItem>
                          <SelectItem value="suv">Luxury SUV</SelectItem>
                          <SelectItem value="tempo">Tempo Traveller</SelectItem>
                          <SelectItem value="bus">Luxury Bus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">{vehicleInfo[vehicleType as keyof typeof vehicleInfo].name}</h4>
                      <p className="text-sm text-gray-500">{vehicleInfo[vehicleType as keyof typeof vehicleInfo].description}</p>
                      <div className="text-sm">
                        <span className="font-medium">Recommended for:</span> {vehicleInfo[vehicleType as keyof typeof vehicleInfo].recommendedFor}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-primary-50 rounded-xl p-4 border border-primary-100 transform lg:rotate-1">
              <h4 className="font-medium text-primary-800 mb-3 flex items-center">
                <Car className="h-4 w-4 mr-2" />
                Vehicle Details
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h5 className="font-medium text-primary-700 mb-2">{vehicleInfo[vehicleType as keyof typeof vehicleInfo].name}</h5>
                  <p className="text-sm text-gray-600 mb-3">{vehicleInfo[vehicleType as keyof typeof vehicleInfo].description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-primary-500 mr-2" />
                    <span className="text-sm">
                      Capacity: <span className="font-medium">{vehicleInfo[vehicleType as keyof typeof vehicleInfo].capacity}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-primary-500 mr-2" />
                    <span className="text-sm">
                      Base Rate: <span className="font-medium">{vehicleInfo[vehicleType as keyof typeof vehicleInfo].price}</span>
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {vehicleInfo[vehicleType as keyof typeof vehicleInfo].features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center transform lg:-rotate-1">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-600">Approximate Cost</p>
                <p className="text-3xl font-bold text-primary-800">{calculateApproxCost()}</p>
              </div>
              
              <div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mb-2 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" /> Instant confirmation
                </Badge>
                <Button 
                  size="lg" 
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white h-12 font-semibold"
                  onClick={handleSubmit(onSubmit)}
                >
                  Book Now <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-6 space-y-6">
            <div className="aspect-video rounded-xl overflow-hidden">
              <img 
                src={vehicleInfo[vehicleType as keyof typeof vehicleInfo].image} 
                alt={vehicleInfo[vehicleType as keyof typeof vehicleInfo].name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{vehicleInfo[vehicleType as keyof typeof vehicleInfo].name}</h3>
              <div className="space-y-2">
                {vehicleInfo[vehicleType as keyof typeof vehicleInfo].features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxiBookingForm;
