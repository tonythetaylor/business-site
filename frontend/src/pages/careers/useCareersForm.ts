// src/pages/careers/useCareersForm.ts
import { useMemo, useState } from "react";
import type { CareerPosition } from "../../api/content";

export type WorkMode = "remote" | "hybrid" | "onsite" | "other" | "";

export type CareersFormState = {
  // data
  positions: CareerPosition[];
  search: string;
  teamFilter: string;
  workModeFilter: WorkMode | "all";
  currentPage: number;
  pageSize: number;

  // derived
  filteredPositions: CareerPosition[];
  totalPages: number;
  paginatedPositions: CareerPosition[];

  // selection
  selectedRoleIds: string[];
  selectedRoles: CareerPosition[];
  sidebarOpen: boolean;
  activeApplyRoleId: string | null;

  // selection actions
  toggleRole: (id: string) => void;
  clearSelection: () => void;
  openQuickApply: (id: string) => void;
  closeQuickApply: () => void;

  // filter actions
  setSearch: (v: string) => void;
  setTeamFilter: (v: string) => void;
  setWorkModeFilter: (v: WorkMode | "all") => void;
  setCurrentPage: (page: number) => void;
  setSidebarOpen: (open: boolean) => void;

  // form fields
  fullName: string;
  email: string;
  link: string;
  note: string;
  resumeFile: File | null;

  setFullName: (v: string) => void;
  setEmail: (v: string) => void;
  setLink: (v: string) => void;
  setNote: (v: string) => void;
  setResumeFile: (f: File | null) => void;

  // submit
  submitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  handleSubmit: (e: React.FormEvent) => void;
};

const PAGE_SIZE = 6;

export function useCareersForm(positions: CareerPosition[]): CareersFormState {
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState<string>("All teams");
  const [workModeFilter, setWorkModeFilter] = useState<WorkMode | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeApplyRoleId, setActiveApplyRoleId] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredPositions = useMemo(() => {
    const q = search.toLowerCase();
    return positions.filter((p) => {
      const title = p.title?.toLowerCase() ?? "";
      const team = p.team?.toLowerCase() ?? "";
      const location = p.location?.toLowerCase() ?? "";
      const workMode = (p.workMode as string | undefined)?.toLowerCase() ?? "";

      const matchesSearch =
        !q || title.includes(q) || team.includes(q) || location.includes(q);

      const matchesTeam =
        teamFilter === "All teams" || p.team === teamFilter;

      const matchesMode =
        workModeFilter === "all" ||
        workMode === workModeFilter ||
        (workModeFilter === "onsite" && workMode === "on-site");

      return matchesSearch && matchesTeam && matchesMode;
    });
  }, [positions, search, teamFilter, workModeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPositions.length / PAGE_SIZE));
  const paginatedPositions = filteredPositions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const selectedRoles = useMemo(
    () => positions.filter((p) => selectedRoleIds.includes(p.id)),
    [positions, selectedRoleIds]
  );

  const toggleRole = (id: string) => {
    setSelectedRoleIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedRoleIds([]);
    setActiveApplyRoleId(null);
  };

  const openQuickApply = (id: string) => {
    if (!selectedRoleIds.includes(id)) {
      setSelectedRoleIds((prev) => [...prev, id]);
    }
    setActiveApplyRoleId(id);
  };

  const closeQuickApply = () => {
    setActiveApplyRoleId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!fullName || !email || !resumeFile || selectedRoleIds.length === 0) {
      setSubmitError(
        "Please add your name, email, resume, and select at least one role."
      );
      return;
    }

    setSubmitting(true);

    // Here you’d POST to your backend; mock for now
    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      setSubmitError(null);

      // Soft reset, keep selectedRoles so they feel "saved"
      setNote("");
    }, 800);
  };

  return {
    positions,
    search,
    teamFilter,
    workModeFilter,
    currentPage,
    pageSize: PAGE_SIZE,

    filteredPositions,
    totalPages,
    paginatedPositions,

    selectedRoleIds,
    selectedRoles,
    sidebarOpen,
    activeApplyRoleId,

    toggleRole,
    clearSelection,
    openQuickApply,
    closeQuickApply,

    setSearch: (v: string) => {
      setSearch(v);
      setCurrentPage(1);
    },
    setTeamFilter: (v: string) => {
      setTeamFilter(v);
      setCurrentPage(1);
    },
    setWorkModeFilter: (v: WorkMode | "all") => {
      setWorkModeFilter(v);
      setCurrentPage(1);
    },
    setCurrentPage,
    setSidebarOpen,

    fullName,
    email,
    link,
    note,
    resumeFile,
    setFullName,
    setEmail,
    setLink,
    setNote,
    setResumeFile,

    submitting,
    submitError,
    submitSuccess,
    handleSubmit,
  };
}