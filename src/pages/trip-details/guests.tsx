import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { AddNewGuestModal } from "./add-new-guest-modal";

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isAddNewGuestModalOpen, setIsAddNewGuestModalOpen] = useState(false);

  function closeAddNewGuestModal() {
    setIsAddNewGuestModalOpen(false);
  }

  function openAddNewGuestModal() {
    setIsAddNewGuestModalOpen(true);
  }


  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <>
      <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>
        <div className="space-y-5">
          {participants.map((participant, index) => {
            return (
              <div key={participant.id} className="flex items-center justify-between">
                <div className="space-y-5">
                  <span className="block font-medium  text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                  <span className="block text-xs truncate text-zinc-400 hover:text-zinc-200">
                    {participant.email}
                  </span>
                </div>
                {participant.is_confirmed ? (
                  <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                ) : (
                  <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                )}
              </div>
            )
          })}

        </div>
        <Button onClick={openAddNewGuestModal} variant="secondary">
          <UserCog className="size-5" />
          Gerenciar convidados
        </Button>
      </div>
      {isAddNewGuestModalOpen && (
        <AddNewGuestModal 
          closeAddImportantLinkModal={closeAddNewGuestModal}
        />
      )}
    </>
  )
}