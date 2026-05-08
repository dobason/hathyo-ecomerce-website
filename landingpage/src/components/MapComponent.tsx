"use client";
import React, { useRef, useEffect, useState } from "react";
import vietmapgl from "@vietmap/vietmap-gl-js/dist/vietmap-gl.js";
import "@vietmap/vietmap-gl-js/dist/vietmap-gl.css";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchAddressFromLatLng } from "@/store/vietmapSlice";

interface Boundary {
  type: number;
  id: number;
  name: string;
  prefix: string;
  full_name: string;
}

interface AutocompleteResponse {
  data: Location[];
}

interface ReverseGeocodeResponse {
  display: string;
  [key: string]: any;
}

interface Location {
  ref_id: string;
  distance: number;
  address: string;
  name: string;
  display: string;
  boundaries: Boundary[];
  categories: string[];
  entry_points: any[];
}

interface Coordinates {
  lng: number;
  lat: number;
}

interface MapComponentProps {
  onSelectLocation?: (data: { address: string; lng: number; lat: number }) => void;
  onClose?: () => void;
  initialLocation?: { lng: number; lat: number };
}

const MapComponent: React.FC<MapComponentProps> = ({
  onSelectLocation,
  onClose,
  initialLocation
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<vietmapgl.Map | null>(null);
  const marker = useRef<vietmapgl.Marker | null>(null);
  const popup = useRef<vietmapgl.Popup | null>(null);

  // Default location: Ho Chi Minh City
  const [lng] = useState<number>(initialLocation?.lng || 106.6297);
  const [lat] = useState<number>(initialLocation?.lat || 10.8231);
  const [zoom] = useState<number>(15);
  const [selectedLocation, setSelectedLocation] = useState<Coordinates>({ lng, lat });
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>(""); //Lưu nội dung người nhập
  const [searchResults, setSearchResults] = useState<Location[]>([]); //Lưu kết quả tìm kiếm
  const [isSearching, setIsSearching] = useState<boolean>(false); //Trạng thái đang tìm kiếm
  const dispatch = useAppDispatch();
  const isFetchingAddress = useAppSelector(
    (state) => state.vietmap.isFetchingAddress
  );
  //Hàm gọi API Autocomplete 
  // async function searchAddress(text:string) {
  //   if(!text) return null;
  //   const apiKey = process.env.NEXT_PUBLIC_VIETMAP_API_KEY;
  //   if(!apiKey) {
  //     console.error("Missing VIETMAP API key");
  //     return null;
  //   }

  //   try {
  //     const url = `https://maps.vietmap.vn/api/autocomplete/v3?apikey=${apiKey}&text=${encodeURIComponent(text)}`;
  //     const res = await fetch(url);
  //     if (!res.ok) throw new Error("API autocomplete request failed");
      
  //     const data = await res.json();
  //     return data; // API này trả về một mảng các đối tượng Location
  //   } catch (error) {
  //     console.error("Error fetching autocomplete:", error);
  //     return null;
  //   }
  // }
  // Hàm gọi API reverse geocoding - Sử dụng NEXT_PUBLIC thay vì VITE
  async function getAddressFromLatLng(lng: number, lat: number) {
    const apiKey = process.env.NEXT_PUBLIC_VIETMAP_API_KEY;
    if (!apiKey) {
      console.error("Missing VIETMAP API key");
      return null;
    }
  
    try {
      const url = `https://maps.vietmap.vn/api/reverse/v3?apikey=${apiKey}&lng=${lng}&lat=${lat}`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`API request failed: ${res.status}`);
      }
      
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  }

  useEffect(() => {
    dispatch(fetchAddressFromLatLng());
  }, [dispatch]);

  // Khởi tạo map
  useEffect(() => {
    if (map.current) return;
  
    const apiKey = process.env.NEXT_PUBLIC_VIETMAP_API_KEY;
    if (!apiKey) {
      console.error("Missing VIETMAP API key");
      setIsLoading(false);
      return;
    }
  
    map.current = new vietmapgl.Map({
      container: mapContainer.current as HTMLElement,
      style: `https://maps.vietmap.vn/maps/styles/tm/style.json?apikey=${apiKey}`,
      center: [lng, lat],
      zoom,
    });
  
    map.current.on("load", async () => {
      setIsLoading(false);
      map.current?.resize();
      
      // Lấy địa chỉ ban đầu
      const data = await getAddressFromLatLng(lng, lat);
      if (data && data[0]?.display) {
        setAddress(data[0].display);
      }
  
      // Tạo popup
      popup.current = new vietmapgl.Popup({ 
        closeButton: false,
        closeOnClick: false,
        offset: [0, -30]
      }).setHTML(
        `<div style="text-align: center;">
          <strong>Địa chỉ được chọn</strong>
        </div>`
      );
  
      // Tạo marker có thể kéo thả
      marker.current = new vietmapgl.Marker({ 
        draggable: true, 
        color: "#ef4444"
      })
        .setLngLat([lng, lat])
        .setPopup(popup.current)
        .addTo(map.current as vietmapgl.Map);
  
      // Xử lý sự kiện kéo thả marker - KHÔNG gọi onSelectLocation
      marker.current.on("dragend", async () => {
        if (popup.current) {
          popup.current.remove();
        }
        if (!marker.current) return;
        const lngLat = marker.current.getLngLat();
  
        setSelectedLocation({
          lng: lngLat.lng,
          lat: lngLat.lat,
        });
  
        try {
          const data = await getAddressFromLatLng(lngLat.lng, lngLat.lat);
          if (data && data[0]?.display) {
            setAddress(data[0].display);
          } else {
            setAddress("Không tìm thấy địa chỉ");
          }
        } catch {
          setAddress("Lỗi khi lấy địa chỉ");
        }
      });

      // Xử lý click trên map để di chuyển marker
      if (map.current) {
        map.current.on('click', async (e) => {
          e.originalEvent.stopPropagation();

          const { lng, lat } = e.lngLat;
          
          if (marker.current) {
            marker.current.setLngLat([lng, lat]);
          }
          
          setSelectedLocation({ lng, lat });
          
          try {
            const data = await getAddressFromLatLng(lng, lat);
            if (data && data[0]?.display) {
              setAddress(data[0].display);
            } else {
              setAddress("Không tìm thấy địa chỉ");
            }
          } catch {
            setAddress("Lỗi khi lấy địa chỉ");
          }
        });
      }
    });
  }, [lng, lat, zoom]);

  // Xử lý resize window
  useEffect(() => {
    const handleResize = (): void => {
      if (map.current) {
        map.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Xử lý chọn địa chỉ
  const handleConfirmLocation = () => {
    if (onSelectLocation && address) {
      onSelectLocation({
        address: address,
        lng: selectedLocation.lng,
        lat: selectedLocation.lat,
      });
    }
  };

  return (
    <div 
      className="w-full h-full flex relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Map container */}
      <div className="flex-1 relative">
        <div 
          ref={mapContainer} 
          className="w-full h-full"
          style={{ minHeight: '400px' }}
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải bản đồ...</p>
            </div>
          </div>
        )}
      </div>
  
      {/* Sidebar thông tin */}
      <div 
        className="w-80 bg-white border-l border-gray-200 p-4 flex flex-col"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Thông tin vị trí
        </h3>
        
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ:
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border text-sm text-gray-800 min-h-[60px]">
              {address || "Đang lấy địa chỉ..."}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tọa độ:
            </label>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Kinh độ:</span>
                <span className="font-mono">{selectedLocation.lng?.toFixed(6)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Vĩ độ:</span>
                <span className="font-mono">{selectedLocation.lat?.toFixed(6)}</span>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Hướng dẫn:</strong> Nhấp vào bản đồ hoặc kéo thả điểm đỏ để chọn vị trí, sau đó nhấn Chọn địa chỉ này.
            </p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="pt-4 space-y-2">
          <button
            onClick={handleConfirmLocation}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            disabled={!address || address.includes("Lỗi") || address.includes("Không tìm thấy")}
          >
            Chọn địa chỉ này
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;